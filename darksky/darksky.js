const request = require('request');

var darkskyApi = 'f4a7ae6e07e46ff7af2d91f0bd6cf001';
var getWeather = (lat, lng, callback) => {
	request ({
		url: `https://api.darksky.net/forecast/${darkskyApi}/${lat},${lng}`,
		json: true
	},(error, response, body) => {
	  if (error) {
	    callback('Error Occured', 'Unable to connect to Forecast.io server.');
	  } else if (response.statusCode === 400) {
	    callback('Unable to fetch weather.');
	  } else if (response.statusCode === 200) {
	    callback(undefined, {
	    	temperature: body.currently.temperature,
	    	apparentTemperature: body.currently.apparentTemperature,
	    });
	  }			
	}); 
}


module.exports.getWeather = getWeather;
