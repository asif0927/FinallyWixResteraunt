const ServiceModel=require('../models/service.model');

const serviceController = {
    getAll: async (req, res) => {
      const {desc} = req.query;
      const services = await ServiceModel.find();
      if (!desc) {
        res.status(200).send(services);
      } else {
        const searchedService = services.filter((x) =>
          x.desc.toLowerCase().trim().includes(desc.toLowerCase().trim())
        );
        res.status(200).send(searchedService);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteService = await ServiceModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deleteService.desc} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const {desc,title} = req.body;
      const newService = new ServiceModel({
        desc:desc,
        title:title,
      });
      await newService.save();
      res.status(201).send({
        message: `${newService.desc} posted successfully`,
        payload: newService,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const {desc,title } = req.body;
      const updatingService= {desc:desc,title:title};
      await ServiceModel.findByIdAndUpdate(id,updatingService);
      res.status(200).send(`${updatingService.desc} updated successfully!`);
    }
  };
  
  module.exports = serviceController;