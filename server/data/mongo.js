var mongojs = require('mongojs');
var db = mongojs('local');

module.exports = db;