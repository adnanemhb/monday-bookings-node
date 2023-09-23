const User = require("../model/User/User");
const AsyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken')
const { hashPassword, isPassMatched } = require("../utils/helpers");

//Login a user
exports.loginController = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //find user
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "Invalid login crendentials" });
    }
    //verify password
    const isMatched = await isPassMatched(password, user.password);

    if (!isMatched) {
        return res.json({ message: "Invalid login crendentials" });
    } else {
        return res.json({
            data: generateToken(user._id),
            message: "Admin logged in successfully",
        });
    }
})

//Logout a user
exports.logoutController = (req, res) => {

}

//Logout a user
exports.registerController = async (req, res) => {
    console.log(req.body)
    const { name, email, password, role } = req.body
    try {
        //Check if email exists
        const userFound = await User.findOne({ email })
        if (userFound) {
          res.json("Admin Exists");
        }
        //register
        const user = await User.create({
            name,
            email,
            password: await hashPassword(password),
            role,
        });
        res.status(201).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        })
    }
}