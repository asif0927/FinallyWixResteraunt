const { body } = require('express-validator');

exports.subscribeValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
];
