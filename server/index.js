const io = require("socket.io")();
const port = 8000;

io.listen(port);

console.log(`🗼 Server listening on port ${port}`);
