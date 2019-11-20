import React, { Component } from "react"; // (2)
import ReactDOM from "react-dom"; // (2)

import faker from "faker";

import Socket from "./data/Socket"; // (2)
import Header from "./__helpers__/header/Header";
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
        name: faker.name.firstName()
      },
      message: "",
      messages: [],
      connectedUsers: []
    };

    this.socket = new Socket(this.state.user); // (2)
  }

  componentDidMount() {
    this.socket.subscribeToMessages(this.setMessages);
    this.socket.subscribeToConnectedUsers(this.setConnectedUsers);
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
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
    this.setState({
      messages: messages
    });
  };

  setConnectedUsers = users => {
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
        <Header connectedUsers={connectedUsers} />
        <Chat user={user} messages={messages} />
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
