const mongoose = require('mongoose')

const ApiCallSchema = new mongoose.Schema(
    {
        last_api_call: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const ApiCall = mongoose.model('ApiCall', ApiCallSchema)
module.exports = ApiCall;