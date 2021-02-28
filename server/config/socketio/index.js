
const SocketIo = (io) =>  {
  io.on("connection", function (socket) {
    console.log(socket.id + ": connected");
    socket.emit("id", socket.id);

    socket.on("disconnect", function () {
      console.log(socket.id + ": disconnected");
    });
    setInterval(() => socket.emit("newMessage", "ahihi"), 3000);
    socket.on("newMessage", (data) => {
      io.sockets.emit("newMessage", { data: data, id: socket.id });
      console.log(data);
    });
  })

}

module.exports = SocketIo;
