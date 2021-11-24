const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send('An error eccured');
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -__v');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send('An error occured');
    }
});

module.exports = router;