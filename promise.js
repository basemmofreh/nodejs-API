const axios = require('axios');
const yargs = require('yargs');

const argv = yargs.options({
  a:{
    demand : true,
    alias :"address",
    describe : "Address to fetch weather data",
    string : true
  }
}).help().alias('help','h').argv;
var encodedAddress ;
argv.address===""?encodedAddress=encodeURIComponent("cairo egypt"):encodedAddress=encodeURIComponent(argv.address)



var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


    //promise
    axios.get(geocodeUrl).then(response=>{
      if(response.data.status==='ZERO_RESULTS')
      {
        throw new Error("unable to find country");
      }

      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      var weatherUrl = `https://api.darksky.net/forecast/f5e8fde0a94922d5158b387495bfcf7d/${lat},${lng}`;
      console.log(response.data.results[0].formatted_address);
      return axios.get(weatherUrl);
      console.log(response.data);
    }).then((response)=>{
      console.log('current temp is : '+response.data.currently.temperature);
    }).catch(e=>{
      if(e.code==='ENOTFOUND')
        {
          console.log('couldnt connect to server');
        }
      else {
        console.log(e.message);
      }
    });
