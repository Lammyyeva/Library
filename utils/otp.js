
const nodemailer = require("nodemailer");
const { pool } = require("../db/db");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendOtp = async(email, otp) => {
    const mailOPtions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "otp",
        text: `your otp: ${otp}`
    };
    await transporter.sendMail(mailOPtions);    
}

const generate_SendOtp = async (email) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60000); //10 min
    await pool.query(`UPDATE users SET otp = $1, otpExpiry = $2 WHERE email = $3`, [otp, otpExpiry, email]);
    await sendOtp(email, otp);
};

const checkOtp = async (email, otp) => {
    const { rows } = await pool.query(`SELECT otp, otpExpiry FROM users WHERE email = $1`, [email]);
    if (rows[0] && rows[0].otp === otp && new Date(rows[0].otpexpiry) > new Date) {
        await pool.query(`UPDATE users SET otp = NULL, otpExpiry = NULL WHERE email = $1`, [email]);
        return true;
    };
    return false;
}



module.exports = {
    generate_SendOtp,
    checkOtp
}