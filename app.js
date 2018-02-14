const request = require('request');
const yargs = require('yargs');

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

let encodedAddress = encodeURIComponent(argv.address);
request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address="${encodedAddress}"`,
    json:true
}, (error, respnose, body)=>{
    if (error) {

    } else {
        let result = body.results[0];                        
        let location = result.geometry.location;
        console.log(`Address: ${result.formatted_address}`);
        console.log(`Lat: ${location.lat}`);
        console.log(`Lng: ${location.lng}`);
    } 
});