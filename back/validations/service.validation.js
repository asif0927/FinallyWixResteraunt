const Joi = require('joi');

const ServicePostSchema = Joi.object({
    desc:Joi.string().required(),
    title:Joi.string().required(),
})

module.exports =ServicePostSchema;