const GaleryModel=require('../models/galery.model');

const galeryController = {
    getAll: async (req, res) => {
      const {img} = req.query;
      const galerrys = await GaleryModel.find();
      if (!img) {
        res.status(200).send(galerrys);
      } else {
        const searchedGallerry = galerrys.filter((x) =>
          x.img.toLowerCase().trim().includes(img.toLowerCase().trim())
        );
        res.status(200).send(searchedGallerry);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteGallery = await GaleryModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deleteGallery.img} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const {img,hastags } = req.body;
      const newGallery = new GaleryModel({
        img:img,
        hastags:hastags,
      });
      await newGallery.save();
      res.status(201).send({
        message: `${newGallery.img} posted successfully`,
        payload: newGallery,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const {img,hastags } = req.body;
      const updatingGalerry= {img:img,hastags:hastags};
      await GaleryModel.findByIdAndUpdate(id,updatingGalerry);
      res.status(200).send(`${updatingGalerry.img} updated successfully!`);
    }
  };
  
  module.exports = galeryController;