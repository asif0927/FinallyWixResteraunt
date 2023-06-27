const Category = require('../models/category.model');
const Food = require('../models/food.model');

exports.checkCategoryRelationship = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const foodsCount = await Food.countDocuments({ category: categoryId });
    if (foodsCount > 0) {
      return res.status(400).json({ error: 'This category in food' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
