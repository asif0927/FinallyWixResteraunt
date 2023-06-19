const Joi = require('joi');

const WorkTimePostSchema=require("../validations/worktime.validation");

const WorkTimeValidationMiddleware = (req, res, next) => {
  const { error } = WorkTimePostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = WorkTimeValidationMiddleware;