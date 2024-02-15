const axios = require('axios');
const API_KEY = 'ad8c3fafac4ee60659ebd900ef5e8370'; // Remplacez par votre clé d'API OpenWeather

async function weather(location) {
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    console.log("-----------");
    console.log(`CALL API: /weather/${location}`);
    console.log(location);
    console.log(`Température : ${data.main.temp} °C`);
    console.log(`Humidité : ${data.main.humidity} %`);
    console.log("-----------");

    return (`Température : ${data.main.temp} °C` + `Humidité : ${data.main.humidity} %`);
  } catch (error) {
    console.error('Erreur lors de la récupération des données météorologiques :', error.message);
  }
}

module.exports = weather;
