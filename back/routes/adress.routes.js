const express = require('express');
const adress_router = express.Router();
const adressController = require('../controllers/adress.controller');
const addressValidationMiddleware = require('../middlewares/adress.middleware');

adress_router.get('/',adressController.getAll);
adress_router.post('/',addressValidationMiddleware,adressController.post);
adress_router.put('/:id',adressController.edit);

module.exports = adress_router;


