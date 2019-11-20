const io = require("socket.io")(); // (1)

const messages = new Set();
const connectedUsers = new Set();

io.on("connection", socket => {
  // (1)
  // console.log(socket) // (1)
  const { id, name } = socket.client.request._query;

  const user = {
    id,
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

const port = 8000; // (1)
io.listen(port); // (1)
