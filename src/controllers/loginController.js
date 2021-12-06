import { User } from '../models/user'
import bcrypt from 'bcrypt'
import { logger } from '../lib/logger'
import { validate } from '../lib/validations'
import { generateAuthToken } from '../lib/generateToken'

export class LoginAuth {
  // POST /LOGIN
  async login (req, res, next) {
    try {
      const { error } = validate(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(400).send('Invalid email or password')

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!validPassword) { return res.status(400).send('Invalid email or password') }

      const token = generateAuthToken(user.id)
      res.send(token)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  };

  // GET /WARNING
  async authorization (req, res, next) {
    res.json('you are authenticated.')
  };
}
