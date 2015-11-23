var IncidentModel = require('../model/IncidentModel');
var Promise = require('bluebird');

function IncidentController(Model){
	this.Model = Promise.promisifyAll(Model);
}

IncidentController.prototype.create = function(req, res){
	var data = req.body;
	var dateCreation = new Date();
	data.dateHourCreate = dateCreation + "";
	
	this.Model.createAsync(data)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"Create Fail, please try again later or contact the System Admin"}');
		});
};

IncidentController.prototype.findAll = function(req, res){
	var data = req.body;

	this.Model.findAllAsync()
		.then(function(result){
			var timeNow = new Date();
			for(index = 0, len = result.length; index < len ; ++index){
			    var timeCreate = new Date(result[index].dateHourCreate);
			    var timeResponse = null;
			    if(result[index].priority == "amarelo"){
				    timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes() + 10, timeCreate.getSeconds(),00);
				}else{
					timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes(), timeCreate.getSeconds(),00);
				}
	
				result[index].regressiveTime = timeResponse.getTime() - timeNow.getTime();
			}
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"List Fail, please try again later or contact the System Admin"}');
		});
};

IncidentController.prototype.findOne = function(req, res){
	var _id = req.params._id;

	this.Model.findOneAsync(_id)
		.then(function(result){
			var timeNow = new Date();
			for(index = 0, len = result.length; index < len ; ++index){
			    var timeCreate = new Date(result[index].dateHourCreate);
			    var timeResponse = null;
			    if(result[index].priority == "amarelo"){
				    timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes() + 10, timeCreate.getSeconds(),00);
				}else{
					timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes(), timeCreate.getSeconds(),00);
				}
	
				result[index].regressiveTime = timeResponse.getTime() - timeNow.getTime();
			}
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"Find One Fail, please try again later or contact the System Admin"}');
		});
};

IncidentController.prototype.filter = function(req, res){
	var _status = req.params._status;

	this.Model.filterAsync(_status)
		.then(function(result){
			var timeNow = new Date();
			for(index = 0, len = result.length; index < len ; ++index){
			    var timeCreate = new Date(result[index].dateHourCreate);
			    var timeResponse = null;
			    if(result[index].priority == "amarelo"){
				    timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes() + 10, timeCreate.getSeconds(),00);
				}else{
					timeResponse = new Date(timeCreate.getFullYear(), 
												timeCreate.getMonth(), 
												timeCreate.getDate(), 
												timeCreate.getHours(), 
												timeCreate.getMinutes(), timeCreate.getSeconds(),00);
				}
	
				result[index].regressiveTime = timeResponse.getTime() - timeNow.getTime();
			}
			res.json(result);	
		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"Filter Fail, please try again later or contact the System Admin"}');
		});
}

IncidentController.prototype.update = function(req, res){
	var requestBody = req.body,
		_id = requestBody._id;
        
        if(requestBody.priority == "preto"){
            requestBody.dateHourLineStop = new Date() + "";
        }

		var data = {
			type : requestBody.type,
			priority: requestBody.priority,
			regressiveTime :requestBody.regressiveTime,
			operatorCreate: requestBody.operatorCreate,
			dateHourCreate	:requestBody.dateHourCreate,
			adress :requestBody.adress,
			status :requestBody.status,
			comment :requestBody.comment,
			operatorClose: requestBody.operatorClose,
			dateHourClose:	requestBody.dateHourClose,
			dateHourLineStop: requestBody.dateHourLineStop,
			operatorLineStop: requestBody.operatorLineStop		
		} 

		this.Model.updateAsync(data, _id)
			.then(function(result){
				res.json(result);
			})
			.catch(function(err){
				console.log(err);
				res.send('{error:"Update Incident Fail, please try again later or contact the System Admin"}');
			});
};

IncidentController.prototype.delete = function(req, res){
	var _id = req.params._id;

	this.Model.deleteAsync(_id)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"Delete Fail, please try again later or contact the System Admin"}');
		});
};

IncidentController.prototype.getDifferenceTime = function(req, res){
	var _id = req.params._id;

	this.Model.findOneAsync(_id)
		.then(function(result){

			var currentDate = new Date();
			var incident = result[0];
			var hourDiff = (currentDate - incident.dateHourCreate)/60000;
			console.log(currentDate + " incident.dateHourCreate  " + incident.dateHourCreate);

			res.json('{diffTime='+hourDiff+'}');

		})
		.catch(function(err){
			console.log(err);
			res.send('{error:"Get Difference Time Fail, please try again later or contact the System Admin"}');
		});
	
};

IncidentController.prototype.cleanDataBase = function(req, res){
	var password = req.params.password;

	if(password == "AdminIndt2015"){
		this.Model.deleteAllAsync()
			.then(function(result){
				res.json(result);
			})
			.catch(function(err){
				res.send('{error:"cleanDataBase error, please call the admin"}');
			});

	}else{
		res.json('{error:"PasswordInvalid"}');
	}
}
	
module.exports = new IncidentController(IncidentModel);

