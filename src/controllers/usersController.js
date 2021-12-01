const { User } = require('../models/user')
const { isUndefined, userValidate } = require('../lib/validations')
const logger = require('../logger')
const generatePassword = require('../lib/generatePassword')

class UsersAuth {
  // POST /REGISTER
  async store (req, res, next) {
    try {
      const { error } = userValidate(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      const user = new User(req.body)
      user.password = await generatePassword(user.password)

      await user.save()

      res.status(201).send(user)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };

  // GET /:id
  async show (req, res, next) {
    try {
      const user = await User.findById(req.user._id).select('-password -__v')
      res.send(user)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };

  // GET
  async index (req, res, next) {
    try {
      const user = await User.find({}, '-password')
      res.send(user)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };

  // PUT /UPDATE
  async update (req, res, next) {
    try {
      const { name, email, password } = req.body
      const user = await User.findById(req.params.id)
      if (!isUndefined(name)) user.name = name
      if (!isUndefined(email)) user.email = email
      if (!isUndefined(password)) {
       user.password = await generatePassword(password)
      }

      await user.save()

      res.sendStatus(204)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };

  // DELETE
  async remove (req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      await user.remove()
      res.sendStatus(204)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };
}

module.exports = UsersAuth
