const express = require('express');
const gallery_router = express.Router();
const galeryController = require('../controllers/galery.controller');
const GalleryValidationMiddleware = require('../middlewares/galery.middleware');

gallery_router.get('/',galeryController.getAll);
gallery_router.post('/',GalleryValidationMiddleware,galeryController.post);
gallery_router.put('/:id',galeryController.edit);
gallery_router.delete('/:id',galeryController.delete);
module.exports = gallery_router;