const express = require('express');
const food_router = express.Router();
const foodController = require('../controllers/food.controller');
const foodMiddleware = require('../middlewares/food.middleware');


food_router.get('/', foodController.getFoods);


food_router.post('/', foodController.createFood);


food_router.put('/:id', foodController.updateFood, foodMiddleware.checkFoodExists);


food_router.delete('/:id', foodController.deleteFood, foodMiddleware.checkFoodExists);


food_router.get('/:id', foodController.getFoodById);


food_router.get('/:id/detail', foodController.getFoodDetail);



module.exports = food_router;
