const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const { isUndefined } = require('../lib/validations')
const logger = require('../logger')

class UsersAuth {
  // POST /REGISTER
  async store (req, res, next) {
    try {
      const { error } = validate(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      const user = new User(req.body)

      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      user.password = await bcrypt.hash(user.password, salt)
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
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        user.password = await bcrypt.hash(password, salt)
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
