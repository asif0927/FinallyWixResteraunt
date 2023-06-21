const Joi = require('joi');

const ServicePostSchema=require("../validations/service.validation");

const ServiceValidationMiddleware = (req, res, next) => {
  const { error } = ServicePostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports =ServiceValidationMiddleware;