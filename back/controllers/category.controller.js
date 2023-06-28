const Category = require('../models/category.model');
const FoodModel = require('../models/food.model');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category posted!', category });
  } catch (error) {
    res.status(500).json({ error: 'Category posted error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    await FoodModel.deleteMany({ categoryId }); 
    res.json({ message: 'Category deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found!' });
    }


    await Food.updateMany({ categoryId }, { category: name });

    res.json({ message: 'Category updated!', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: 'Category error!' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
