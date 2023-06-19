const Joi = require('joi');

const GalleryPostSchema = Joi.object({
    img:Joi.string().required(),
    hastags:Joi.string().required()
})

module.exports =GalleryPostSchema;