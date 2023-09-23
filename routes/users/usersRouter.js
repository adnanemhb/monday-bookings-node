const express = require('express')
const {
    loginController,
    logoutController,
    registerController,
} = require("../../controller/userController");


const usersRouter = express.Router()

usersRouter.post('/login', loginController)

usersRouter.post('/logout', logoutController)

usersRouter.post('/register', registerController)

module.exports = usersRouter