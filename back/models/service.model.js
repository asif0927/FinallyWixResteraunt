const mongoose = require('mongoose');


const ServiceModel = mongoose.model(
  "Service",
  new mongoose.Schema({
    title: String,
    desc: String,
  })
);


module.exports = ServiceModel;

