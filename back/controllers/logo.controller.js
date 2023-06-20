const LogoModel=require('../models/logo.model');

const logoController = {
    getAll: async (req, res) => {
      const {image} = req.query;
      const photos = await LogoModel.find();
      if (!image) {
        res.status(200).send(photos);
      } else {
        const searchedPhoto = photos.filter((x) =>
          x.image.toLowerCase().trim().includes(image.toLowerCase().trim())
        );
        res.status(200).send(searchedPhoto);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deletePhoto = await LogoModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deletePhoto.image} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const {image } = req.body;
      const newLogo = new LogoModel({
        image:image,
      });
      await newLogo.save();
      res.status(201).send({
        message: `${newLogo.image} posted successfully`,
        payload: newLogo,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const {image } = req.body;
      const updatingPhoto= {image:image};
      await LogoModel.findByIdAndUpdate(id,updatingPhoto);
      res.status(200).send(`${updatingPhoto.image} updated successfully!`);
    }
  };
  
  module.exports = logoController;