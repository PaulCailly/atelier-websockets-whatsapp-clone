import io from "socket.io-client";

class Socket {
  constructor(user) {
    this.user = user;
    this.socket = io(`http://localhost:8000/?name=${user.name}`);

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
    this.socket.emit("messages", message);
  };
}

export default Socket;
