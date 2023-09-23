const becrypt = require("bcryptjs");
const fetchMondayBookingsApi = require('../externalApisCalls/fetchMondayBookingsApi')

exports.hashPassword = async password => {
    const salt = await becrypt.genSalt(10);
    return await becrypt.hash(password, salt);
};

exports.isPassMatched = async (password, hash) => {
    return await becrypt.compare(password, hash);
};

exports.isLastApiCallStale = lastRecord => {
    if (!lastRecord) {
        return true;
    }

    const currentTime = new Date();
    const lastApiCallTime = lastRecord.last_api_call;
    const timeDifference = currentTime - lastApiCallTime;
    const thirtyMinutesInMillis = 30 * 60 * 1000; // 30 minutes in milliseconds

    return timeDifference > thirtyMinutesInMillis;
}

exports.isValidJSON = myString => {
    if (myString === null || myString === '') {
        return false;
    }
    try {
        JSON.parse(myString);
        return true;
    } catch (error) {
        return false;
    }
}

exports.isValidFloatString = s =>  {
    try {
        const floatValue = parseFloat(s);
        return !isNaN(floatValue) && isFinite(floatValue);
    } catch (error) {
        return false;
    }
}


