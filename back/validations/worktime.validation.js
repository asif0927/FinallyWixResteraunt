const Joi = require('joi');

const WorkTimePostSchema = Joi.object({
    starttime:Joi.string().min(3).required(),
    finishtime:Joi.string().min(3).required(),
    weekendstarttime:Joi.string().min(3).required(),
    weekendfinishtime:Joi.string().min(3).required()
});

module.exports = WorkTimePostSchema;