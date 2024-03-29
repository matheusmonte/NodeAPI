var express = require('express');
var router = express.Router();

var IncidentController = require('../controller/IncidentController');

router.get('/incident', IncidentController.findAll.bind(IncidentController));
router.get('/incident/filter/:_status', IncidentController.filter.bind(IncidentController));
router.get('/incident/gettimedifference/:_id',  IncidentController.getDifferenceTime.bind(IncidentController));
router.post('/incident/create', IncidentController.create.bind(IncidentController));
router.get('/incident/find/:_id', IncidentController.findOne.bind(IncidentController));
router.put('/incident/update',  IncidentController.update.bind(IncidentController));
router.delete('/incident/remove/:_id',  IncidentController.delete.bind(IncidentController));
router.get('/incident/secret/cleandatabase/:password', IncidentController.cleanDataBase.bind(IncidentController));


var UtilController = require('../controller/UtilController');

router.get('/util/currenttime', UtilController.getHour.bind(UtilController));


module.exports = router;