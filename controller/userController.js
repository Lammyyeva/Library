const { pool } = require("../db/db");
const jwt = require("jsonwebtoken");
const { generate_SendOtp, checkOtp} = require("../utils/otp");
const { hashPassword, comparePassword } = require("../utils");
const { generateUserAccessToken, generateUserRefreshToken } = require("../utils/index");

// registers user and sends otp to email
const register = async (req, res) => {
    const { username, email, password} = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const queryText = `INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3)`;
        await pool.query(queryText, [username, email, hashedPassword]);
        //otp
        await generate_SendOtp(email);
        return res.status(200).send("otp send to your email");
    } catch (error) { 
        console.log(error);
        return res.status(500).send(false);
    };
}

//verifies otp
const verifyOtp = async (req, res) => {
    const {email, otp} = req.body;   
    try { 
        const verified = await checkOtp(email, otp); 
        if (verified) {
            return res.status(201).json({message: "user otp is correct"});
        } else {
            return res.status(403).json({message: "user otp is invalid"});
       }
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
}

//complete;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const queryText = `SELECT * FROM users WHERE email = $1`;
        const {rows} = await pool.query(queryText, [email]);
        console.log(rows[0]); // remove
        
        if (rows[0].length === 0) return res.status(403).json({ error: 'there is no user with this email' });
        const correctPassword = await comparePassword(password, rows[0].password);
        if (!correctPassword) return res.status(403).json({ error: "incorrect password" });

        const accessToken = await generateUserAccessToken(rows[0]);
        const refreshToken = await generateUserRefreshToken(rows[0]);
        res.cookie("refreshToken", refreshToken, {httpOnly: true}); //check
        return res.status(200).json({accessToken,refreshToken})
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        if (refreshToken === null) return res.status(401)
        jwt.verify(refreshToken, process.env.ADMIN_REFRESH_KEY, async(error, user) => {
        if (error) return res.status(403).json({error})
        const accessToken = await generateUserAccessToken(user);
        const refreshToken = await generateUserRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {httpOnly: true}); //check 
        return res.status(200).json(accessToken,refreshToken)
    }) 
    } catch (error) {
       console.log(error);
       return res.status(500).send(false); 
    }
    

}

//forget password
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await generate_SendOtp(email);
        return res.status(200).json({ msg: "otp sent to your email" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

//reset password
const resetPassword = async (req, res) => {
    try {
        const { id, password, passwordConfirm } = req.body;
        if (password === passwordConfirm) {
            await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [password, id]);
            return res.status(200).send(true);
        }
        return res.json({msg:"passwords are not equal"})
    } catch (error) {
        return res.status(500).send(false);
    }
}

//renew
const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "you logged out successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

//home page
const getHomePage = async(req, res) => {
    const querytext = `SELECT 
(SELECT json_agg(row_to_json(authors)) FROM (SELECT a.name, a.url FROM authors a LIMIT 4) authors) AS authors,
(SELECT json_agg(row_to_json(recommended_books)) FROM (
SELECT b.url, b.favorite, b.recommended, b.name AS book_name, a.name AS author_name, ROUND((SELECT AVG(r.rating) FROM ratings r 
WHERE r.book_id = b.id), 1) AS rating,b.description 
FROM books b
INNER JOIN authors a ON a.id = b.author_id 
WHERE b.recommended = true 
LIMIT 4
) recommended_books) AS recommended_books,
(SELECT json_agg(row_to_json(categories)) FROM (SELECT c.url, c.name FROM categories c) categories) AS categories`;
    try {
        const response = await pool.query(querytext, []);
        return res.json({ homePage: response.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

//authors
const seeAllAuthors = async(req, res) => {
    const queryText = `SELECT a.url, a.name, a.year_of_birth FROM authors a`;
    try {
        const response = await pool.query(queryText, []);
        return res.json({ Authors: response.rows});
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
}; 

//individual author
const seeAuthor = async (req, res) => {
    const { id } = req.params;
    const queryText = `SELECT a.url, a.name , a.description AS biography FROM authors a WHERE a.id = ${id}`;
    try {
        const response = await pool.query(queryText, []);
        return res.json({Author: response.rows});
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
   
}; 

//categories
const selectCategory = async(req, res) => {
    const  {id}  = req.params;
    const categoryNameQuery = `SELECT c.name FROM categories c WHERE id = ${id}`;
    const categoryName = await pool.query(categoryNameQuery, []);

    const queryText = `SELECT sub.name FROM sub_categories sub WHERE sub.category_id = ${id}`;
    try {
        const response = await pool.query(queryText, []);
        return res.json({
        category: categoryName.rows[0].name,
        sub_categories: response.rows
    });
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }

}; 

// books for selected subcategory
const selectSubCategoryBooks = async(req, res) => {
    const {id}  = req.params;
    const sub_categoryNameQuery = `SELECT sub.name FROM sub_categories sub WHERE sub.id = ${id}`;
    const sub_categoryName = await pool.query(sub_categoryNameQuery, []);

    const queryText = `SELECT b.name FROM books b WHERE b.sub_category_id = ${id}`;
    try {
        const response = await pool.query(queryText, []);
        return res.json({
        sub_category: sub_categoryName.rows[0].name,
        books: response.rows
    });
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
  
}; 

//individual book
const seeBook = async (req, res) => {
    const { id } = req.params;
    const queryText = `SELECT b.url, b.favorite, ROUND((SELECT AVG(r.rating) FROM ratings r 
    WHERE r.book_id = ${id}), 1) AS rating, 
    b.name, b.description,
    (SELECT sub.name FROM sub_categories sub INNER JOIN books b ON b.sub_category_id = sub.id WHERE b.id = ${id}) AS subCategory 
    FROM books b WHERE b.id = ${id}`; 
    try {
        const response = await pool.query(queryText, []);
        return res.json({Book: response.rows});
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }

}; 

//post rating to a book
const postRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    queryText1 = `INSERT INTO ratings(rating, book_id)
    VALUES (${rating}, ${id})`;
     try {
        await pool.query(queryText1, []);
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

//get favorite books
const getFavorites = async (req, res) => {
    const queryText = `SELECT b.url, b.favorite, b.name AS book_name, a.name AS author_name, ROUND((SELECT AVG(r.rating) FROM ratings r), 1) AS rating, b.description 
FROM books b
INNER JOIN authors a ON a.id = b.author_id 
WHERE b.favorite = true`
    try {
        const favorites = await pool.query(queryText, []);
        return res.status(200).json({favorite: favorites})
    } catch (error) {
        return res.status(500).send(false);
    }
}

//labelling favorite 
const addToFavorite = async (req, res) => {
    const { id } = req.params;
    queryText1 = `UPDATE books SET favorite = true WHERE id = ${id}`;
     try {
        await pool.query(queryText1, []);
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

const removeFromFavorite = async (req, res) => {
    const { id } = req.params;
    queryText1 = `UPDATE books SET favorite = false WHERE id = ${id}`;
     try {
        await pool.query(queryText1, []);
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

module.exports = {
    register,
    verifyOtp,
    login,
    refreshToken,
    forgetPassword,
    resetPassword,
    logout,
    getHomePage,
    seeAllAuthors,
    seeAuthor,
    selectCategory,
    selectSubCategoryBooks,
    seeBook,
    postRating,
    getFavorites,
    addToFavorite,
    removeFromFavorite
}