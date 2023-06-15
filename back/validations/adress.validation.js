const Joi = require('joi');

const AdressPostSchema = Joi.object({
    street: Joi.string().max(30).min(2).required(),
    city: Joi.string().min(2).required(),
    state: Joi.string().required(),
    zipCode:Joi.string().min(2).required(),
    telephone:Joi.string().min(7).required()
})

module.exports = AdressPostSchema