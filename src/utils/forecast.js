const request = require('request');

const forecast = (latitude , longitude , callback) => {
    const url = `https://api.darksky.net/forecast/65de29b0818e4f329c754fad75bb78b8/${latitude},${longitude}?units=si`
    request({url : url  ,json:true} , (error,response) => {
        if(error){
            callback('unable to connect to weather services!' , undefined);
            return;
        }
        if(response.body.error){
            callback('invalid request!' , undefined);
            return;
        }
        callback(undefined , `${response.body.daily.summary}It is currently ${response.body.currently.temperature} degree celsius outside. There is a ${parseFloat(response.body.currently.precipProbability) * 100}% chance of rain.`);
    })

}

module.exports = forecast