
let socket_io = require('socket.io');
let io = socket_io();
let socketApi= {};
io.on('connection', function(socket) {
  console.log('app.js connection');
}); socketApi.io = io;
module.exports = socketApi;
