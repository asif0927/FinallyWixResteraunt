const WorkTimeModel=require('../models/worktime.model');

const WorkTimeController = {
    getAll: async (req, res) => {
      const {starttime} = req.query;
      const times = await WorkTimeModel.find();
      if (!starttime) {
        res.status(200).send(times);
      } else {
        const searchedWorkTime = times.filter((x) =>
          x.starttime.toLowerCase().trim().includes(starttime.toLowerCase().trim())
        );
        res.status(200).send(searchedWorkTime);
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;
      //delete
      const deleteWorkTime = await WorkTimeModel.findByIdAndDelete(id);
      res.status(203).send({
        message: `${deleteWorkTime.starttime} deleted successfully!`,
      });
    },
    post: async (req, res) => {
      const {starttime,finishtime, weekendstarttime,weekendfinishtime} = req.body;
      const newTime = new WorkTimeModel({
        finishtime:finishtime,
        starttime:starttime,
        weekendstarttime:weekendstarttime,
        weekendfinishtime:weekendfinishtime
      });
      await newTime.save();
      res.status(201).send({
        message: `${newTime.starttime} posted successfully`,
        payload: newTime,
      });
    },
    edit: async(req, res) => {
      const id = req.params.id;
      const {starttime,finishtime,weekendstarttime,weekendfinishtime } = req.body;
      const updatingTime = {starttime:starttime,finishtime:finishtime,weekendstarttime:weekendstarttime,weekendfinishtime:weekendfinishtime};
      await WorkTimeModel.findByIdAndUpdate(id,updatingTime);
      res.status(200).send(`${updatingTime.starttime} updated successfully!`);
    }
  };
  
  module.exports = WorkTimeController;