const mongoose = require('mongoose');


const GifModel = new mongoose.model(
  "Gifs",
  new mongoose.Schema({
    giffile:String,
  })
);

module.exports = GifModel;