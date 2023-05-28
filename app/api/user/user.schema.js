const Joi = require("Joi");
Joi.ObjectId = require("joi-objectid")(Joi)

const _login = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()

})

const _register = Joi.object().keys({

    username: Joi.string().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    state: Joi.ObjectId(),
    city: Joi.ObjectId()
})

module.exports = {
    login: _login,
    register: _register
}