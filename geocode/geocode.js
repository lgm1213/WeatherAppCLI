const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);
	var geocodeApi = 'AIzaSyA2w5v7tehnW4Rfh4FQd3JuD4DKpquZaYo';

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
		    longitude: body.results[0].geometry.location.lat,
		    latitude: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports.geocodeAddress = geocodeAddress;
