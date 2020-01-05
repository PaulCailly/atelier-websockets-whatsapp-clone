// Modules
import React, { Component } from "react";
import ReactDOM from "react-dom";
import faker from "faker";

// API
import Socket from "./Socket";

// Components
import Header from "./components/header/Header";
import Chat from "./components/chat/Chat";
import MessageInput from "./components/message-input/MessageInput";

// Styles
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: faker.name.firstName()
      },
      message: "",
      messages: [],
      connectedUsers: []
    };

    this.socket = new Socket(this.state.user);
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
    const { user, message, messages, connectedUsers } = this.state;

    return (
      <div>
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

ReactDOM.render(<App />, document.getElementById("root"));
