const Joi = require("Joi");

const _login = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()

})

const _register = Joi.object().keys({

    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required()

})

module.exports = {
    login: _login,
    register: _register
}