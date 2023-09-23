const moment = require('moment');
const fetchMondayBookingsApi = require('../externalApisCalls/fetchMondayBookingsApi')
const {isValidJSON, isValidFloatString} = require('../utils/helpers')
const Booking = require('../model/Booking/Booking')
const ApiCall = require('../model/ApiCall/ApiCall')
const fetchAndSaveMondayBookings = async lastApiCall => {
    const mondayBookingResponse = await fetchMondayBookingsApi()
    if (mondayBookingResponse.status !== 'success') {
        return
    }
    const boards = mondayBookingResponse.data.data['boards']
    const bookingsToSave = await formatBookingsData(boards)
    if (!bookingsToSave.length) {
        return
    }
    await saveBookings(bookingsToSave)
    await updateLastApiCall(lastApiCall)
}

const saveIfNotExists = async booking => {
    const existingBooking = await Booking.findOne({ item_id: booking.item_id });
    if (!existingBooking) {
        const newBooking = new Booking(booking);
        await newBooking.save();
        console.log(`Saved booking with item_id: ${booking.item_id}`);
    } else {
        console.log(`Booking with item_id: ${booking.item_id} already exists`);
    }
}

const saveBookings = async bookingsToSave => {
    for (const booking of bookingsToSave) {
        await saveIfNotExists(booking);
    }
}
const updateLastApiCall = async lastApiCall => {
    if (lastApiCall) {
        lastApiCall.last_api_call = new Date();
        await lastApiCall.save();
        console.log('Last API call updated successfully');
    } else {
        // If no records found, create a new one with the current date and time
        const newRecord = new ApiCall({ last_api_call: new Date() });
        await newRecord.save();
        console.log('New API call record created and last_api_call updated');
    }
}


const formatBookingsData = async boards => {
    const bookingsToSave = [];
    for (const boardData of boards) {
        for (const itemData of boardData.items) {
            let checkInDate = '';
            let checkOutDate = '';
            let flatBooked = '';
            let bookingValue = 0.0;
            let status = '';

            for (const columnValue of itemData['column_values']) {
                if (columnValue.title === 'Timeline' && isValidJSON(columnValue.value)) {
                    const timelineDict = JSON.parse(columnValue.value);
                    if ('start' in timelineDict) {
                        checkInDate = timelineDict.from;
                    }
                    if ('to' in timelineDict) {
                        checkOutDate = timelineDict.to;
                    }
                } else if (columnValue.title === 'Flat Booked') {
                    flatBooked = columnValue.value;
                } else if (columnValue.title === 'Status' && columnValue.value !== '') {
                    status = columnValue.text;
                } else if (columnValue.title === 'Booking Value' || columnValue.title === 'Amount') {
                    const bookingValueValue = columnValue.value;
                    if (isValidFloatString(bookingValueValue)) {
                        bookingValue = parseFloat(bookingValueValue);
                    }
                }
            }

            const booking = {
                item_id: itemData.id,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
                flat_booked: flatBooked,
                booking_value: bookingValue,
                guest_name: itemData.name,
                status: status !== '' ? status : (itemData.group ? itemData.group.title : 'empty_group'),
                creation_log: moment(itemData['created_at']).utc().format('YYYY-MM-DD HH:mm'),
            };

            if (checkOutDate !== '') {
                bookingsToSave.push(booking);
            }
        }
    }
    return bookingsToSave
}

module.exports = fetchAndSaveMondayBookings