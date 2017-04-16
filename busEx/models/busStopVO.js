var mongoose = require('mongoose');
var busStopVO = new mongoose.Schema({
	
	STATION_NUM:{type:String},
	BUSSTOP_ID:{type:String},
	BUSSTOP_NAME:{type:String},
	NAME_E:{type:String},
	LONGITUDE:{type:String},
	LATITUDE:{type:String},
	ARS_ID:{type:String},
	NEXT_BUSSTOP:{type:String}
	
})
module.exports = mongoose.model('busStop',busStopVO)