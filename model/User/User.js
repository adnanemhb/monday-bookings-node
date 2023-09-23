const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'admin'
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', managerSchema)
module.exports = User;