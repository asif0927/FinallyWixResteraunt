const Food = require('../models/food.model');
const Category = require('../models/category.model');

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};




exports.createFood = async (req, res) => {
  try {
    const { name, price, img, description, category } = req.body;

    const categoryObj = await Category.findOne({ name: category });

    if (!categoryObj) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const food = new Food({ name, price, img, description, category: categoryObj._id });
    await food.save();
    res.status(201).json({ message: 'Food posted', food });
  } catch (error) {
    res.status(500).json({ error: 'Food error' });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const { name, price, img, description, category} = req.body;

    const categoryObj = await Category.findOne({ name: category });

    if (!categoryObj) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { name, price, img, description, category: categoryObj._id },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json({ message: 'Food updated', food: updatedFood });
  } catch (error) {
    res.status(500).json({ error: 'Food error' });
  }
};


exports.deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    await Food.findByIdAndDelete(foodId);
    res.json({ message: 'Food deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getFoodDetail = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Error' });
    }
    res.render('foodDetail', { food }); 
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
