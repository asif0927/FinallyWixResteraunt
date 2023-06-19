const mongoose = require('mongoose');


const GaleryModel = new mongoose.model(
  "Gallerys",
  new mongoose.Schema({
    img:String,
    hastags:String,
  })
);

module.exports = GaleryModel;