const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(user);
};

class LoginAuth {

    // POST /LOGIN
    async login(req, res, next) {
        try {
            const { error } = validate(req.body);
            if (error) return res.status(400).send(error.details[0].message)

            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(400).send('Invalid email or password');

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword)
                return res.status(400).send("Invalid email or password");

            const token = user.generateAuthToken();
            res.send(token);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    // GET /WARNING
    async authorization(req, res, next) {
        try {
            res.json('you are authenticated.');
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}

module.exports = LoginAuth;
