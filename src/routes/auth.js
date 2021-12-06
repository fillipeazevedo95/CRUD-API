import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { LoginAuth } from '../controllers/loginController'

const router = express.Router()
const loginAuth = new LoginAuth()

router.post('/', loginAuth.login)
router.get('/', authMiddleware, loginAuth.authorization)

export const authRouter = router
