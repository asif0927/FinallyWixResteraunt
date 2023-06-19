const mongoose = require('mongoose');


const WorkTimeModel = new mongoose.model(
  "WorkTimes",
  new mongoose.Schema({
    starttime: String,
    finishtime: String,
    weekendstarttime:String,
    weekendfinishtime:String,
  })
);

module.exports = WorkTimeModel;