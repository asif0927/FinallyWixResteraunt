const GifModel=require('../models/gif.model');

const gifController = {
    getAll: async (req, res) => {
      const {giffile} = req.query;
      const gifs = await GifModel.find();
      if (!giffile) {
        res.status(200).send(gifs);
      } else {
        const searchedGifs = gifs.filter((x) =>
          x.giffile.toLowerCase().trim().includes(giffile.toLowerCase().trim())
        );
        res.status(200).send(searchedGifs);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteGif = await GifModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${GifModel.giffile} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const {giffile } = req.body;
      const newGif = new GifModel({
        giffile:giffile,
      });
      await newGif.save();
      res.status(201).send({
        message: `${newGif.giffile} posted successfully`,
        payload: newGif,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const {giffile } = req.body;
      const updatingGif= {giffile};
      await GifModel.findByIdAndUpdate(id,updatingGif);
      res.status(200).send(`${updatingGif.gitfile} updated successfully!`);
    }
  };
  
  module.exports = gifController;