import io from "socket.io-client";

class Socket {
  constructor() {
    this.socket = io(`http://localhost:8000/`);

    window.onbeforeunload = () => {
      this.socket.close();
    };
  }

  sendMessage = message => {
    this.socket.emit("messages", message);
  };
}

export default Socket;
