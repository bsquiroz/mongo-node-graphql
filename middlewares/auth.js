const jwt = require("jsonwebtoken");

const authMid = (req, res, next) => {
    const token = req.headers["x-token"];

    try {
        const verified = jwt.verify(token, process.env.WORD_SECRET);
        req.verified_token = verified.user;
        next();
    } catch (error) {
        next();
    }
};

module.exports = {
    authMid,
};
