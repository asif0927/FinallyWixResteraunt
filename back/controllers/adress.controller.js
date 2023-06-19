const AdressModel = require('../models/adress.model');

const adressController = {
  getAll: async (req, res) => {
    const { city } = req.query;
    const adresses = await AdressModel.find();
    if (!city) {
      res.status(200).send(adresses);
    } else {
      const searchedAdresses = adresses.filter((x) =>
        x.name.toLowerCase().trim().includes(city.toLowerCase().trim())
      );
      res.status(200).send(searchedAdresses);
    }
  },
  post: async (req, res) => {
    const { street, city, state, zipCode, telephone,iframeSrc } = req.body;
    const newAddress = new AdressModel({
      street:street,
      city:city,
      state:state,
      zipCode:zipCode,
      telephone:telephone,
      iframeSrc: iframeSrc,
    });
    await newAddress.save();
    res.status(201).send({
      message: `${newAddress.city} posted successfully`,
      payload: newAddress,
    });
  },
  edit: async(req, res) => {
    const id = req.params.id;
    const { street, city, state, zipCode, telephone,iframeSrc } = req.body;
    const updatingAdress = {street:street,city:city,state:state,zipCode:zipCode,telephone:telephone,iframeSrc:iframeSrc};
    await AdressModel.findByIdAndUpdate(id,updatingAdress);
    res.status(200).send(`${updatingAdress.city} updated successfully!`);
  },
  delete: async (req, res) => {
    const id = req.params.id;
    //delete
    const deleteAdress = await AdressModel.findByIdAndDelete(id);
    res.status(203).send({
      message: `${deleteAdress.city} deleted successfully!`,
    });
  },
};

module.exports = adressController;