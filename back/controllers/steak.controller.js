const SteakModel=require('../models/steak.model');

const steakController = {
    getAll: async (req, res) => {
      const {title} = req.query;
      const steaks = await SteakModel.find();
      if (!title) {
        res.status(200).send(steaks);
      } else {
        const searchedSteaks = steaks.filter((x) =>
          x.title.toLowerCase().trim().includes(title.toLowerCase().trim())
        );
        res.status(200).send(searchedSteaks);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteSteak = await SteakModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deleteSteak.title} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const { title,url } = req.body;
      const newSteak = new SteakModel({
        title:title,
        url:url,
      });
      await newSteak.save();
      res.status(201).send({
        message: `${newSteak.title} posted successfully`,
        payload: newSteak,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const { title,url } = req.body;
      const updatingSteak = {title:title,url:url};
      await SteakModel.findByIdAndUpdate(id,updatingSteak);
      res.status(200).send(`${updatingSteak.title} updated successfully!`);
    }
  };
  
  module.exports = steakController;