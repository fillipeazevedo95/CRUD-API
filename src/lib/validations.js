import Joi from 'joi'

export const userValidate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user)
}

export const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user)
}

export function isUndefined (props) {
  return typeof props === 'undefined'
}
