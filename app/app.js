const express = require('express')
const morgan = require('morgan')
const app = express()
const bookingsRouter = require('../routes/bookings/bookingsRouter')
const usersRouter = require('../routes/users/usersRouter')

app.use(morgan('dev'))
//Pass incoming json data
app.use(express.json())

//routes

app.use('/', usersRouter)

app.use('/', bookingsRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the monday bookings api' });
});



module.exports = app