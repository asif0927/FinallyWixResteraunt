const express = require('express');
const category_router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryMiddleware = require('../middlewares/category.middleware');


category_router.post('/', categoryController.createCategory);

category_router.delete('/:id', categoryController.deleteCategory, categoryMiddleware.checkCategoryRelationship);

category_router.put('/:id', categoryController.updateCategory);


category_router.get('/', categoryController.getCategories);


module.exports = category_router;
