const ApiCall = require('../model/ApiCall/ApiCall'); // Import your model

async function getLastApiCall() {
    try {
        return await ApiCall.findOne().sort({createdAt: -1}).exec()
    } catch (error) {
        return null
    }
}

module.exports = getLastApiCall