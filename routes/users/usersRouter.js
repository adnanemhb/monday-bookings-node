const express = require('express')
const {
    loginController,
    logoutController,
    registerController,
} = require("../../controller/userController");


const usersRouter = express.Router()

usersRouter.get('/login', loginController)

usersRouter.get('/logout', logoutController)

usersRouter.post('/register', registerController)

module.exports = usersRouter