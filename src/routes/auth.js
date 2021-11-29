const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const LoginAuth = require('../controllers/loginController');

const loginAuth = new LoginAuth;

router.post('/', loginAuth.login);
router.get('/', auth, loginAuth.authorization);

module.exports = router;