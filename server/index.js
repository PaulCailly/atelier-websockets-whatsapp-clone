const io = require("socket.io")();
const port = 8000;

const messages = new Set();

io.on("connection", socket => {
  console.log("✋ New connection ! ID:", socket.id);

  io.emit("messages", Array.from(messages));

  socket.on("messages", message => {
    messages.add(message);
    console.log(messages);
    io.emit("messages", Array.from(messages));
  });
});

io.listen(port);

console.log(`🗼 Server listening on port ${port}`);
