const mongoose = require('mongoose');


const LogoModel = new mongoose.model(
  "Logosqsqsq",
  new mongoose.Schema({
    image:String,
  })
);

module.exports = LogoModel;