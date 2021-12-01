const Joi = require('joi')

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user)
}

function isUndefined (props) {
  return typeof props === 'undefined'
}

module.exports = { validate, isUndefined }
