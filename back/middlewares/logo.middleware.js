const Joi = require('joi');

const LogoPostSchema=require("../validations/logo.validation");

const LogoValidationMiddleware = (req, res, next) => {
  const { error } = LogoPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports =LogoValidationMiddleware;