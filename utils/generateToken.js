const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, 'anyKey', {expiresIn: '30min'})
}

module.exports = generateToken