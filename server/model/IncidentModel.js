var mongo = require('../data/mongo');

function IncidentModel(type, priority, regressiveTime, operatorCreate, dateHourCreate, adress, status, comment, operatorClose, dateHourClose, dateHourLineStop, operatorLineStop){
	
			this.type = type;
			this.priority = priority;
			this.regressiveTime = regressiveTime
			this.operatorCreate = operatorCreate
			this.dateHourCreate = dateHourCreate;
			this.adress = adress;
			this.status = status;
			this.comment = comment;
			this.operatorClose = operatorClose;
			this.dateHourClose = dateHourClose;
			this.dateHourLineStop = dateHourLineStop;
			this.operatorLineStop = operatorLineStop;

}



IncidentModel.prototype.create = function(data, callback){
    console.log("IncidentModel::Create::data recived on body: " + data);
	mongo.collection('incident').save(data, callback);
};

IncidentModel.prototype.findAll = function(callback){
	mongo.collection('incident').find({}, callback);
};

IncidentModel.prototype.findOne = function(_id, callback){
	mongo.collection('incident').find({ "_id": mongo.ObjectId(_id) }, callback);
};

IncidentModel.prototype.filter = function(_status, callback){
	mongo.collection('incident').find({"status":_status } , callback);
};	

IncidentModel.prototype.update = function(data, _id, callback){
	mongo.collection('incident').update({"_id": mongo.ObjectId(_id) }, data,callback);
};

IncidentModel.prototype.delete = function(_id, callback){
	mongo.collection('incident').remove({"_id": mongo.ObjectId(_id) }, callback);
};

IncidentModel.prototype.deleteAll = function(callback){
	mongo.collection('incident').remove({}, callback);
};



module.exports = new IncidentModel();