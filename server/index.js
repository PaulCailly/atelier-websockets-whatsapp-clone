const Server = require("socket.io");
const io = new Server();

const messages = new Set();
const connectedUsers = new Set();

io.on("connection", socket => {
  const { name } = socket.client.request._query;

  const user = {
    name
  };

  connectedUsers.add(user);

  io.emit("connectedUsers", Array.from(connectedUsers));

  io.emit("messages", Array.from(messages));

  socket.on("messages", message => {
    messages.add(message);
    io.emit("messages", Array.from(messages));
  });

  socket.once("disconnect", () => {
    connectedUsers.delete(user);
    io.emit("connectedUsers", Array.from(connectedUsers));
  });
});

const port = 8000;
io.listen(port);
console.log(`🗼 Server listening on port ${port}`);
