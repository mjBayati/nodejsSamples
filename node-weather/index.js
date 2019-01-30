const request = require('request');

let apiKey = '42d3e7a51b45198d188a96dce1736b81';
let city = 'manchester';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

request(url, function(err, res){
    if(err){
        console.log('err: ', err);
    }
    else if(res){
        console.log('res: ', res);
    }
});