const Joi = require('joi');

const SocialPostSchema=require("../validations/social.validation");

const SocialPostMiddleware = (req, res, next) => {
  const { error } = SocialPostSchema.validate(req.body);
  if (error === undefined) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i) => i.message).join(",");
    res.send({ message: message });
  }
};

module.exports = SocialPostMiddleware;  