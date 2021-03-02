const socketApi = (http) => {
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", function (socket) {
    console.log(socket.id + ": connected");
    socket.emit("id", socket.id);

    socket.on("disconnect", function () {
      console.log(socket.id + ": disconnected");
    });
  });

  global.io = io;
};
module.exports = socketApi;
