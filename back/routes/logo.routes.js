const express = require('express');
const logo_router = express.Router();
const logoController = require('../controllers/logo.controller');
const LogoValidationMiddleware = require('../middlewares/logo.middleware');

logo_router.get('/',logoController.getAll);
logo_router.post('/',LogoValidationMiddleware,logoController.post);
logo_router.put('/:id',logoController.edit);
logo_router.delete('/:id',logoController.delete);
module.exports = logo_router;