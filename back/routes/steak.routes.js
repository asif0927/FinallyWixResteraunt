const express = require('express');
const steak_router = express.Router();
const steakController = require('../controllers/steak.controller');
const  steakValidationMiddleware= require('../middlewares/steak.middleware');

steak_router.get('/',steakController.getAll);
steak_router.post('/',steakValidationMiddleware,steakController.post);
steak_router.put('/:id',steakController.edit);
steak_router.delete('/:id',steakController.delete);

module.exports = steak_router;