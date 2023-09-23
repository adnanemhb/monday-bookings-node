const ApiCall = require('../model/ApiCall/ApiCall')
const getLastApiCall = require('../externalApisCalls/getLastApiCall')
const fetchAndSaveMondayBookings = require('../utils/fetchAndSaveMondayBookings')
const {isLastApiCallStale} = require('../utils/helpers')
const Booking = require('../model/Booking/Booking')

//get all the bookings
exports.bookingsController = async (req, res) => {
    if (!req.userAuth) {
        return res.status(401).json({
            'status': 'failure',
            'message': 'Unauthorized',
        })
    }
    let lastApiCall = await getLastApiCall()
    if (isLastApiCallStale(lastApiCall)) {
        await fetchAndSaveMondayBookings(lastApiCall)
    }
    const bookings = await Booking.find({});
    const todayCheckingBookings = [];
    const upcomingCheckouts = [];

    const today = new Date(); // Get the current date
    const nextThreeDays = new Date();
    nextThreeDays.setDate(nextThreeDays.getDate() + 3);

    for (const booking of bookings) {
        if (booking.check_in_date && booking.check_in_date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)) {
            // Booking has a check-in date today
            todayCheckingBookings.push(booking);
        } else if (
            booking.check_out_date &&
            booking.check_out_date >= today &&
            booking.check_out_date <= nextThreeDays
        ) {
            // Booking has a check-out date within the next three days
            upcomingCheckouts.push(booking);
        }
    }

    return res.status(200).json({
        allBookings: bookings,
        todayCheckingBookings: todayCheckingBookings,
        upcomingCheckouts: upcomingCheckouts
    })
}