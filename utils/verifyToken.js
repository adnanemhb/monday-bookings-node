const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
    return jwt.verify(token, 'anyKey', (err, decoded) => {
        if (err) {
            return {
                message: "Invalid token"
            }
        } else {
            return decoded
        }
    })
}

module.exports = verifyToken