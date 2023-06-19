const express = require('express');
const worktime_router = express.Router();
const WorkTimeController = require('../controllers/worktime.controller');
const  WorkTimeValidationMiddleware= require('../middlewares/worktime.middleware');

worktime_router.get('/',WorkTimeController.getAll);
worktime_router.post('/',WorkTimeValidationMiddleware,WorkTimeController.post);
worktime_router.put('/:id',WorkTimeController.edit);
worktime_router.delete('/:id',WorkTimeController.delete);

module.exports = worktime_router;