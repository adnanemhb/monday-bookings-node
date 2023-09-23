const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        guest_name: {
            type: String,
            required: false,
            default: null
        },
        status: {
            type: String,
            required: false,
            default: null
        },
        flat_booked: {
            type: String,
            required: false,
            default: null
        },
        check_in_date: {
            type: Date,
            required: false,
            default: null
        },
        check_out_date: {
            type: Date,
            required: false,
            default: null
        },
        creation_log: {
            type: Date,
            required: false,
            default: null
        },
        booking_value: {
            type: Number,
            required: false,
            default: null
        },
        item_id: {
            type: Number,
            required: false,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking;