const { pool } = require("../db/db");

// check
const addBook = async (req, res) => {
    const { id } = req.headers;
    const { name, author_id, description, url, sub_category_id } = req.body;

    try {
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        const admin = user.rows[0];
        console.log("admin: ", admin);
        if (admin.role != 'admin') return res.status(401).send("you don't have access to perform this task");
        const queryText = `INSERT INTO books(name, author_id, description, url, sub_category_id) 
        VALUES ($1, $2, $3, $4, $5)`;
        await pool.query(queryText, [name, author_id, description, url, sub_category_id]);
        return res.status(200).send(true);
    } catch (error) {
        console.log(error);
        return res.status(500).send(false);
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, author_id, description, url, favorite, recommended, sub_category_id } = req.body;
    const queryText = `
    UPDATE books SET
    name = $1, author_id = $2, description = $3, url = $4, favorite = $5, recommended = $6, sub_category_id = $7
    WHERE id  = $8`;
    try {
        await pool.query(queryText, [name, author_id, description, url, favorite, recommended, sub_category_id, id]);
        return res.status(200).send(true)
    } catch (error) {
        return res.status(500).send(false);
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const queryText = `DELETE FROM books WHERE id = $1`;
    try {
        await pool.query(queryText, [id]);
        return res.status(200).send(true);
    } catch (error) {
        return res.status(500).send(false);
    }
};


module.exports = {
    addBook,
    updateBook,
    deleteBook
}