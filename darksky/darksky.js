const request = require('request');

var darkskyApi = process.env.DARKSKYAPI;
var getWeather = () => {
	
	request ({
			url: `https://api.darksky.net/forecast/${darkskyApi}/37.8267,-122.4233`,
			json: true
		},(error, response, body) => {
		  if (error) {
		    console.log('Unable to connect to Forecast.io server.');
		  } else if (response.statusCode === 400) {
		    console.log('Unable to fetch weather.');
		  } else if (response.statusCode === 200) {
		    console.log(body.currently.temperature);
		  }			
		}); 
}


module.exports.getWeather = getWeather;
