const jwt = require("jsonwebtoken");

const createJwt = (user) => {
    return jwt.sign({ user }, process.env.WORD_SECRET, {
        expiresIn: "5d",
    });
};

module.exports = {
    createJwt,
};
