const mongoose = require('mongoose');


const SteakModel = new mongoose.model(
  "Steakes",
  new mongoose.Schema({
    title: String,
    url: String,
  })
);

module.exports = SteakModel;