const jwt = require("jsonwebtoken");

const VerifyAdminAccessToken = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(400).json({ msg: "token is not provided" });
        }
        token = token.split(" ")[1];
        jwt.verify(token, process.env.ADMIN_ACCESS_KEY, (err, user) => {
            if (err) {
                console.log("errorrrrr: ", err);
                return res.status(403).send(false);
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("blinnnnnnn: ", error);
        return res.status(500).send(false);
    }
};

module.exports = {
    VerifyAdminAccessToken
}