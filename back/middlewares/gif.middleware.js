const Joi = require('joi');

const GifPostSchema=require("../validations/gif.validation");

const GifValidationMiddleware = (req, res, next) => {
  const { error } = GifPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = GifValidationMiddleware;