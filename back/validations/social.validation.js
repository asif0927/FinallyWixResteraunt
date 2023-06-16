const Joi = require('joi');

const SocialPostSchema = Joi.object({
    iconurl:Joi.string().min(3).required(),
    socialmediaurl:Joi.string().required(),
})

module.exports = SocialPostSchema;