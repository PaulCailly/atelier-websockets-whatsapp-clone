const io = require("socket.io")();
const port = 8000;

io.on("connection", socket => {
  console.log("✋ New connection ! ID:", socket.id);

  socket.on("messages", message => {
    console.log(message);
  });
});

io.listen(port);

console.log(`🗼 Server listening on port ${port}`);
