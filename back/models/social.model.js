const mongoose = require('mongoose');


const SocialModel = new mongoose.model(
  "Socials",
  new mongoose.Schema({
    iconurl: String,
    socialmediaurl: String,
  })
);

module.exports = SocialModel;  