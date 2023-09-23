const User = require("../model/User/User");

//Login a user
exports.loginController = async (req, res) => {
    const {email, password} = req.body;
    try {
        //find user
        const user = await User.findOne(email)
        if (!user) {
            return res.json({
                status: 'failure',
                message: 'User not found'
            })
        }
        if (user && await user.verifyPassword(password)) {
            return res.json({
                status: 'success',
                data: user
            })
        } else {
            return res.json({
                status: 'failure',
                message: 'Invalid login credentials'
            })
        }
    } catch (error) {
        return res.json({
            status: 'failure',
            message: error.message
        })
    }
}

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
            password,
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