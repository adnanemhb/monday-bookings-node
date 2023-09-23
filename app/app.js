const express = require('express')
const morgan = require('morgan')
const app = express()
const bookingsRouter = require('../routes/bookings/bookingsRouter')
const usersRouter = require('../routes/users/usersRouter')

//routes

app.use('/', usersRouter)

app.use('/', usersRouter)

app.use('/', bookingsRouter)




module.exports = app