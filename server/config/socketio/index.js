

const express = require("express");
const app = express();
const http = require("http").Server(app);


const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

let Socket = {
  emit: function (event, data) {
    console.log(event, data);
    io.sockets.emit(event, data);
  },
  on: function (event, data) {
    console.log(event, data);
    io.sockets.on(event, data);
  },
};

const connect = () => {
  io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("disconnect", function () {
      console.log(socket.id + ": disconnected");
    });
  });
}


exports.Socket = Socket;
exports.connect = connect;


