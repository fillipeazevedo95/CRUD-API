const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// POST /REGISTER
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

// GET /:id
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -__v');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send('An error occured');
    }
});

// GET
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (erro) {
        console.log(error);
        res.send('An error occured')
    }
});

// PUT /UPDATE
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);
        if(typeof name !== "undefined") user.name = name;
        if(typeof email !== "undefined") user.email = email;
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(password, salt);
              
        await user.save();

        res.sendStatus(204); 
    } catch (error) {
        console.log(error);
        res.send('An error occured')
    }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.remove()
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.send('An error occured')
    }
});

module.exports = router;