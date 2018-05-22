const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
  .options({
  	a: {
  		demand: true,
  		alias: 'address',
  		describe: 'Address to fetch weather for',
  		string: true
  	}
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeApi = 'AIzaSyDcLZjoD4I6ELgi-fWNzrW69dITTbCfKmg';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeApi}`;
var darkskyApi = 'f4a7ae6e07e46ff7af2d91f0bd6cf001';

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find address.')
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var darkskiesUrl = `https://api.darksky.net/forecast/${darkskyApi}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(darkskiesUrl);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API server.')
	} else {
		console.log(e.message);
	}
});