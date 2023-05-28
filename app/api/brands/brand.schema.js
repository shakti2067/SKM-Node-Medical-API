const Joi = require("Joi")
Joi.objectId = require("joi-objectid")(Joi)


const _brand = Joi.object().keys({
    title: Joi.string().alphanum().required(),
    key: Joi.string().alphanum(),
    image: Joi.string(),
    category: Joi.objectId().required()

})


module.exports = {
    brand: _brand
}