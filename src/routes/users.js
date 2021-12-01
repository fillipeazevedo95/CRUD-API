const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const UsersAuth = require('../controllers/usersController')

const userAuth = new UsersAuth

router.post('/', userAuth.store)
router.get('/', auth, userAuth.index)
router.put('/:id', auth, userAuth.update)
router.delete('/:id', auth, userAuth.remove)
router.get('/:id', auth, userAuth.show)

module.exports = router
