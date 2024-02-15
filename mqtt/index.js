// second part for creating the mqtt server

const aedes = require('aedes')()
const MQTTserver = require('net').createServer(aedes.handle)
const MQTTport = 1883

MQTTserver.listen(MQTTport, function () {
  console.log('server started and listening on port ', MQTTport)
})

// Handle Aedes Events
aedes.on('client', function (client) {
  console.log('Client Connected:', client.id);
});

aedes.on('clientDisconnect', function (client) {
  console.log('Client Disconnected:', client.id);
});

aedes.on('publish', function (packet, client) {
  if (client) {
      console.log('Message Published by Client:', client.id);
  }
  console.log('Message:', packet.payload.toString());
});
