const request = require('request');

const API_KEY = '446b2618d8ea2ab116210f40e2d5e98b';
var getWeather = (lat, lng, callback) => {
    request({
        url:`https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=auto`,
        json: true
    }, (error, response, body)=>{
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
}

module.exports.getWeather = getWeather;