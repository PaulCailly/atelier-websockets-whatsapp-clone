const Server = require("socket.io"); // (1)
const io = new Server(); // (1)

const messages = new Set(); // (5)
const connectedUsers = new Set(); // (7)

io.on("connection", socket => {
  // (1)
  // console.log("✋ New connection. ID:", socket.id); // (1)
  const { name } = socket.client.request._query;

  const user = {
    name // (4)
  };

  connectedUsers.add(user); // (7)

  io.emit("connectedUsers", Array.from(connectedUsers)); // (7)

  io.emit("messages", Array.from(messages)); // FIN

  socket.on("messages", message => {
    // (5)
    messages.add(message);
    io.emit("messages", Array.from(messages));
  });

  socket.once("disconnect", () => {
    connectedUsers.delete(user); // (7)
    io.emit("connectedUsers", Array.from(connectedUsers)); // (7)
  });
});

const port = 8000; // (1)
io.listen(port); // (1)
console.log(`🗼 Server listening on port ${port}`); // (1)
