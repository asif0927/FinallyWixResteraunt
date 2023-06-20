const Joi = require('joi');

const LogoPostSchema = Joi.object({
    image:Joi.string().required(),
})

module.exports =LogoPostSchema;