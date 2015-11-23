function UtilController(){
	this.CurrentTime = new Date();
}

UtilController.prototype.getHour = function(req, res){
	this.CurrentTime = new Date();
	res.json('"{CurrentTime":'+ this.CurrentTime + '"}');
};

module.exports = new UtilController();

