const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
		var encodedAddress = encodeURIComponent(address);
		var geocodeApi = 'AIzaSyDcLZjoD4I6ELgi-fWNzrW69dITTbCfKmg';
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeApi}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Error Occured, unable to connect to Google Server');
			} else if (body.status === 'ZERO_RESULTS') {
		    reject('Unable to locate address entered.');
			} else if (body.status === 'OK') {
				resolve({
					address: body.results[0].formatted_address,
			    latitude: body.results[0].geometry.location.lat,
			    longitude: body.results[0].geometry.location.lng
				});
			}
		});
  });
};

geocodeAddress('99999999').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
});