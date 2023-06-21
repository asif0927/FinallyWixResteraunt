const express = require('express');
const service_router = express.Router();
const serviceController = require('../controllers/service.controller');
const ServiceValidationMiddleware = require('../middlewares/service.middleware');

service_router.get('/',serviceController.getAll);
service_router.post('/',ServiceValidationMiddleware,serviceController.post);
service_router.put('/:id',serviceController.edit);
service_router.delete('/:id',serviceController.delete);
module.exports = service_router;