const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address="${encodedAddress}"`,
        json:true
    }, (error, respnose, body)=>{
        if (error) {
            callback('Unable to connect to Google servers.');    
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if(body.status === 'OK') {
            let result = body.results[0];                        
            let location = result.geometry.location;
            callback(undefined, {
                address: result.formatted_address,
                latitude: location.lat,
                longitude: location.lng
            })
        }
    });
}
module.exports.geocodeAddress = geocodeAddress;