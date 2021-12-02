const jwt = require('jsonwebtoken')

const generateAuthToken = function (id) {
    const token = jwt.sign({ _id: id }, process.env.JWTPRIVATEKEY)
    return token
}

module.exports = { generateAuthToken }