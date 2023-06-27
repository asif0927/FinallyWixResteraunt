const Food = require('../models/food.model');

exports.checkFoodExists = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    req.food = food;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};