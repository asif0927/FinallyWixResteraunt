const Joi = require('joi');

const GalleryPostSchema=require("../validations/galery.validation");

const GalleryValidationMiddleware = (req, res, next) => {
  const { error } = GalleryPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = GalleryValidationMiddleware;