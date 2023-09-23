const express = require('express')

const usersRouter = express.Router()

usersRouter.get('/login', (req, res) => {
    console.log('/login')
})

usersRouter.get('/logout', (req, res) => {
    console.log('/logout')
})

module.exports = usersRouter