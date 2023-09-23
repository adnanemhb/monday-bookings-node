const verifyToken = require("../utils/verifyToken");
const User = require('../model/User/User')

const isLoggedIn = async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
        req.userAuth = await User.findById(verifiedToken.id).select(
            "name email role"
        );
        next();
    } else {
        const err = new Error("Token expired/invalid");
        next(err);
    }
}

module.exports = isLoggedIn