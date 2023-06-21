const mongoose = require('mongoose');


const ServiceModel = new mongoose.model(
  "Services",
  new mongoose.Schema({
    title:String,
    desc:String,
  })
);

module.exports = ServiceModel;