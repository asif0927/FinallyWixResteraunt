const express = require('express');
const gif_router = express.Router();
const gifController = require('../controllers/gif.controllers');
const GifValidationMiddleware = require('../middlewares/gif.middleware');

gif_router.get('/',gifController.getAll);
gif_router.post('/',GifValidationMiddleware,gifController.post);
gif_router.put('/:id',gifController.edit);
gif_router.delete('/:id',gifController.delete);
module.exports = gif_router;
