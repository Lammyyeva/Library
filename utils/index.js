const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const comparePassword = async (password, hash) => {
    const compare = await bcrypt.compare(password, hash);
    return compare;
}

const generateUserAccessToken = async (data) => {
    const userAccessToken = jwt.sign(data, process.env.ADMIN_ACCESS_KEY, { expiresIn: "20s" });
    return userAccessToken;
}

const generateUserRefreshToken = async (data) => {
    const userRefreshToken = jwt.sign(data, process.env.ADMIN_REFRESH_KEY, { expiresIn: "5m" });
    return userRefreshToken;
}


module.exports = {
    hashPassword,
    comparePassword,
    generateUserAccessToken,
    generateUserRefreshToken
};