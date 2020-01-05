const io = require("socket.io")();
const port = 8000;

const messages = new Set();
const connectedUsers = new Set();

io.on("connection", socket => {
  console.log("✋ New connection ! ID:", socket.id);
  const { name } = socket.client.request._query;

  const user = {
    name
  };

  connectedUsers.add(user);
  io.emit("connectedUsers", Array.from(connectedUsers));

  io.emit("messages", Array.from(messages));

  socket.on("messages", message => {
    messages.add(message);
    console.log(messages);
    io.emit("messages", Array.from(messages));
  });

  socket.once("disconnect", () => {
    connectedUsers.delete(user);
    io.emit("connectedUsers", Array.from(connectedUsers));
  });
});

io.listen(port);

console.log(`🗼 Server listening on port ${port}`);
