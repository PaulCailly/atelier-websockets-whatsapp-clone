import io from "socket.io-client"; // (3)

class Socket {
  // (3)
  constructor(user) {
    // (3)
    this.user = user;
    this.socket = io(`http://localhost:8000/?name=${user.name}`); // (3)

    window.onbeforeunload = () => {
      this.socket.close();
    };
  }

  subscribeToConnectedUsers = callback => {
    this.socket.on("connectedUsers", users => {
      callback(users);
    });
  };

  subscribeToMessages = callback => {
    // (6)
    this.socket.on("messages", messages => {
      const parsedMessages = messages.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp),
        direction:
          message.sender.name === this.user.name ? "outgoing" : "incoming"
      }));
      callback(parsedMessages);
    });
  };

  sendMessage = message => {
    // (4)
    this.socket.emit("messages", message);
  };
}

export default Socket; // (3)
