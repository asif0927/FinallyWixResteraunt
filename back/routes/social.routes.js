const express = require('express');
const social_router = express.Router();
const socialController = require('../controllers/social.controller');
const  SocialPostMiddleware= require('../middlewares/social.middleware');

social_router.get('/',socialController.getAll);
social_router.post('/',SocialPostMiddleware,socialController.post);
social_router.put('/:id',socialController.edit);
social_router.delete('/:id',socialController.delete);

module.exports = social_router;  