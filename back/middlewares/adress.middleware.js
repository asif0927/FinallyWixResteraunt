const Joi = require('joi');

const AdressPostSchema=require("../validations/adress.validation");

const addressValidationMiddleware = (req, res, next) => {
  const { error } = AdressPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = addressValidationMiddleware;
