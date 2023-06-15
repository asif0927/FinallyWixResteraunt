const Joi = require('joi');

const SteakPostSchema=require("../validations/steak.validation");

const steakValidationMiddleware = (req, res, next) => {
  const { error } = SteakPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = steakValidationMiddleware;