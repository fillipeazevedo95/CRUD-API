const bcrypt = require('bcrypt')

module.exports = async function(password) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    password = await bcrypt.hash(password, salt)
    return password
}

