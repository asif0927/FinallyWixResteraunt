const Joi = require('joi');

const SteakPostSchema = Joi.object({
    title:Joi.string().min(3).required(),
    url:Joi.string().required(),
})

module.exports = SteakPostSchema