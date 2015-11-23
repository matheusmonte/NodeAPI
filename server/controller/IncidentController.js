var IncidentModel = require('../model/IncidentModel');
var Promise = require('bluebird');

function IncidentController(Model){
	this.Model = Promise.promisifyAll(Model);
}


IncidentController.prototype.create = function(req, res){
	var data = req.body;

	this.Model.createAsync(data)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{"response:error"}');
		});
};

IncidentController.prototype.findAll = function(req, res){
	var data = req.body;

	this.Model.findAllAsync()
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{"response:error"}');
		});
};

IncidentController.prototype.findOne = function(req, res){
	var _id = req.params._id;

	this.Model.findOneAsync(_id)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.send('{"response:error"}');
		});
};

IncidentController.prototype.filter = function(req, res){
	var _status = req.params._status;

	this.Model.filterAsync(_status)
		.then(function(result){
			res.json(result);	
		})
		.catch(function(err){
			console.log(err);
			res.send('{"response:error"}');
		});
}

IncidentController.prototype.update = function(req, res){
	var data = req.body,
		_id = req.params._id;

		this.Model.updateAsync(data, _id)
			.then(function(result){
				res.json(result);
			})
			.catch(function(err){
				console.log(err);
				res.send('{"response:error"}');
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
			res.send('{"response:error"}');
		});
};
	
module.exports = new IncidentController(IncidentModel);

