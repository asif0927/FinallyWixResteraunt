const mongoose = require('mongoose');


const AdressModel = new mongoose.model(
  "Adresses",
  new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode:String,
    telephone:String,
    iframeSrc: String,
  })
);

module.exports = AdressModel;