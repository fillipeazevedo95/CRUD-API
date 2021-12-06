import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { UsersAuth } from '../controllers/usersController'

const router = express.Router()

const userAuth = new UsersAuth()

router.post('/', userAuth.store)
router.get('/', authMiddleware, userAuth.index)
router.put('/:id', authMiddleware, userAuth.update)
router.delete('/:id', authMiddleware, userAuth.remove)
router.get('/:id', authMiddleware, userAuth.show)

export const userRouter = router
