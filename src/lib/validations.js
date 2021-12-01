const Joi = require('joi')

const userValidate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user)
}

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

module.exports = { validate, isUndefined, userValidate }
