const Joi = require('joi');

const GifPostSchema = Joi.object({
    giffile:Joi.string().required(),
})

module.exports = GifPostSchema;