const express = require('express');
const subscriber_router = express.Router();
const subscriberController = require('../controllers/subscriber.controller');


subscriber_router.get('/', subscriberController.getAllSubscribers);


subscriber_router.post('/', subscriberController.createSubscriber);


subscriber_router.put('/:id', subscriberController.updateSubscriber);


subscriber_router.delete('/:id', subscriberController.deleteSubscriber);

module.exports = subscriber_router;


