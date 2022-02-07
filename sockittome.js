module.exports = (io) => {
  const parentNamespace = io.of(/^\w$/);

  parentNamespace.use((socket, next) => {
    next();
  });

  io.use((socket, next) => {
    if (!socket.handshake.query.roomName) {
      next(new Error("Invalid Room"));
    } else {
      next();
    }
  }).on("connect", (socket) => {
    console.log(`Client ${socket.id} is connected.`);
  });
};
