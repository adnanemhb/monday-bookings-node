const express = require('express')

const {bookingsController} = require('../../controller/bookingController')
const isLoggedIn = require('../../middlewares/isLoggedIn')

const bookingsRouter = express.Router()

bookingsRouter.get('/bookings', isLoggedIn, bookingsController)

module.exports = bookingsRouter