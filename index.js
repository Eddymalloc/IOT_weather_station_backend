const fs = require('fs');
const https = require('https');

//mqtt require and port
const mqtt = require('mqtt');

//express require and uses
const express = require('express');
const app = express();
const port = 443;

//cors require and uses
const cors = require('cors');

//cors uses
app.use(cors());

// Read SSL/TLS certificates
const privateKey = fs.readFileSync('./https/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('./https/selfsigned.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Configure HTTPS server
const httpsServer = https.createServer(credentials, app);

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to MongoDB');});

//routes requires
const login = require('./routes/login');
const weather = require('./routes/weather');
const register = require('./routes/register');
const user = require('./routes/user');
const plage = require('./routes/plage');

app.use('/register', register);
app.use('/login', login);
app.use('/weather', weather);
app.use('/user', user);
app.use('/plage', plage);

//general route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// // Start the server
// httpsServer.listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// MQTT Server Options
const options = {
  clientId: 'subscriber-client-weather',
  clean: true
};

// MQTT Server URL
const url = 'mqtt://localhost:1883';

// Create MQTT Client
const client = mqtt.connect(url, options);

// Handle MQTT Client Connect Event
client.on('connect', function () {
  console.log('Subscriber connected to MQTT Server');

  // Subscribe to a Topic
  client.subscribe('IOT', function (err) {
    if (!err) {
      console.log('Subscribed to IOT');
    } else {
      console.error('Error Subscribing to Topic:', err);
    }
  });
});

let lastReceivedMessage = null;

// Handle MQTT Message Event
client.on('message', function (topic, message) {
  lastReceivedMessage = message.toString();
});

// Handle MQTT Client Error Event
client.on('error', function (err) {
  console.error('Subscriber Error:', err);
});

//general route for mqtt
app.get('/temperature', (req, res) => {
  res.send(lastReceivedMessage);
});