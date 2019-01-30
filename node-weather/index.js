const request = require('request');
const argv =require('yargs').argv;


let apiKey = '42d3e7a51b45198d188a96dce1736b81';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

request(url, function(err, res, body){
    if(err){
        console.log('err: ', err);
    }
    else if(res){
        let weather = JSON.parse(body);
        let massage = `it is ${weather.main.temp} degree in ${weather.name}`;
        console.log('res: ', massage);
    }
});