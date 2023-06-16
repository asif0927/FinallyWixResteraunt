const SocialModel = require('../models/social.model');
const socialController = {
    getAll: async (req, res) => {
      const {iconurl} = req.query;
      const socials = await SocialModel.find();
      if (!iconurl) {
        res.status(200).send(socials);
      } else {
        const searchedSocials = socials.filter((x) =>
          x.iconurl.toLowerCase().trim().includes(iconurl.toLowerCase().trim())
        );
        res.status(200).send(searchedSocials);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteSocial = await SocialModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deleteSocial.iconurl} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const { iconurl,socialmediaurl } = req.body;
      const newSocial = new SocialModel({
        socialmediaurl:socialmediaurl,
        iconurl:iconurl,
      });
      await newSocial.save();
      res.status(201).send({
        message: `${newSocial.iconurl} posted successfully`,
        payload: newSocial,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const { iconurl,socialmediaurl } = req.body;
      const updatingSocial = {socialmediaurl:socialmediaurl,iconurl:iconurl};
      await SocialModel.findByIdAndUpdate(id,updatingSocial);
      res.status(200).send(`${updatingSocial.iconurl} updated successfully!`);
    }
  };
  
  module.exports = socialController;  