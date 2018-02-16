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
    }).help()
    .alias('help', 'h')
    .argv;

const API_KEY = '446b2618d8ea2ab116210f40e2d5e98b';    
let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address="${encodedAddress}"`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESOLTS') {
        throw new Error('Unable to find that address.');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=auto`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);  
}).then((response) =>{
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`IT's currently ${temperature}. It feels like ${apparentTemperature}`);    
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
})