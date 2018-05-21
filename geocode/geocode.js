const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);
	var geocodeApi = 'AIzaSyDcLZjoD4I6ELgi-fWNzrW69dITTbCfKmg';

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeApi}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Error Occured, unable to connect to Google Server');
		} else if (body.status === 'ZERO_RESULTS') {
	    callback('Unable to locate address entered.');
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
		    latitude: body.results[0].geometry.location.lat,
		    longitude: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports.geocodeAddress = geocodeAddress;
