import React, { Component } from "react"; // (2)
import ReactDOM from "react-dom"; // (2)

import faker from "faker";

import Socket from "./Socket"; // (2)
import Header from "./components/header/Header";
import Chat from "./components/chat/Chat";
import MessageInput from "./components/message-input/MessageInput";

import "./styles.css";

class App extends Component {
  // (2)
  constructor() {
    // (2)
    super(); // (2)

    this.state = {
      user: {
        name: faker.name.firstName() // (4)
      },
      message: "", // (4)
      messages: [], // (6)
      connectedUsers: [] // (7)
    };

    this.socket = new Socket(this.state.user); // (3) +
  }

  componentDidMount() {
    this.socket.subscribeToMessages(this.setMessages); // (6)
    this.socket.subscribeToConnectedUsers(this.setConnectedUsers); // (7)
  }

  handleChange = event => {
    // (4)
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
    // (4)
    event.preventDefault();

    const message = {
      timestamp: new Date(),
      sender: this.state.user,
      content: this.state.message
    };

    this.socket.sendMessage(message);

    this.setState({ message: "" });
  };

  setMessages = messages => {
    // (6)
    this.setState({
      messages: messages
    });
  };

  setConnectedUsers = users => {
    // (7)
    this.setState({
      connectedUsers: users
    });
  };

  render() {
    // (2)
    const { user, message, messages, connectedUsers } = this.state;
    return (
      <div>
        {/* Hello World  // (2) */}
        {/* <Header /> // (7) */}
        <Header connectedUsers={connectedUsers} />
        {/* <Chat /> *} // (6) */}
        <Chat user={user} messages={messages} />
        {/* <MessageInput /> *} // (4) */}
        <MessageInput
          input={{ value: message, onChange: this.handleChange }}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App; // (2)

ReactDOM.render(<App />, document.getElementById("root")); // (2)
