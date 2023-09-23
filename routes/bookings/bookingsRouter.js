const express = require('express')

const {bookingsController} = require('../../controller/bookingController')

const bookingsRouter = express.Router()

bookingsRouter.get('/bookings', bookingsController)

module.exports = bookingsRouter