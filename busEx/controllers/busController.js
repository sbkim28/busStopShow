var Servicekey = encodeURIComponent('oGSKZNoF53caOSis8nKAD44xFC1xNehVsWzrhNl8b2Nxn0VZgwPV1QphHYVY2I%2FVPmtjnsEc2O%2FM%2FgxSHlsmVg%3D%3D');
var request = require('request');
module.exports = (app,dto)=>{
	
	app.get('/',(req,res)=>{
		res.redirect('/busStation');
	});
	app.get('/busStation',(req,res)=>{
		var url = 'http://api.gjcity.net/json/stationInfo?';
		var query = encodeURIComponent('ServiceKey')+'='+Servicekey;
		
		request(url + query,(err,response,body)=>{
			if(JSON.parse(body).RESULT.RESULT_CODE =='SUCCESS'){
				dto.remove((err)=>{
					var data = JSON.parse(body).STATION_LIST;
					data.forEach((bus)=>{
						var _dto = new dto(bus);
						_dto.save((err)=>{
							
						});
					});
				});
				
				res.redirect('/busStop/view');
			}else{
				res.end(JSON.parse(body).RESULT.RESULT_MSG);
			}
		});
	});
	
	app.get('/busStop/view',(req,res)=>{
		res.render('busStopFind');
	});
	app.get('/busStop/find/:query',(req,res)=>{
		var busStopName = RegExp('^'+req.params.query);
		dto.find({'BUSSTOP_NAME':busStopName}).sort({'BUSSTOP_NAME':1}).exec((err,data)=>{
			res.json(data);
		});
	});
	app.get('/busStop/idFind/:BUSSTOP_ID',(req,res)=>{
		dto.findOne({'BUSSTOP_ID':req.params.BUSSTOP_ID},(err,data)=>{
			res.json(data);
		});
	});
	app.get('/bus/find/:BUSSTOP_ID',(req,res)=>{
		var busstopID = req.params.BUSSTOP_ID;
		var url = 'http://api.gjcity.net/json/arriveInfo?';
		var query = encodeURIComponent('ServiceKey')+'='+Servicekey;
		query += '&' + encodeURIComponent('BUSSTOP_ID')+'='+busstopID;
		request(url + query,(err,response,body)=>{
			if(JSON.parse(body).RESULT.RESULT_CODE =='SUCCESS'){
				var data = JSON.parse(body).BUSSTOP_LIST;
				res.json(data);
			}else{
				res.json();
			}
		});
	});
	app.get('/bus/detail',(req,res)=>{
		var url = 'http://api.gjcity.net/json/lineInfo?';
		var query = encodeURIComponent('ServiceKey')+'='+Servicekey;
		request(url + query,(err,response,body)=>{
			if(JSON.parse(body).RESULT.RESULT_CODE =='SUCCESS'){
				var data = JSON.parse(body).LINE_LIST;
				res.json(data);
			}else{
				res.json();
			}
		});
	});
	
	
}