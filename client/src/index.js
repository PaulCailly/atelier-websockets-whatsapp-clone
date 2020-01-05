// Modules
import React, { Component } from "react";
import ReactDOM from "react-dom";
import faker from "faker";

// API
import Socket from "./Socket";

// Components
import MessageInput from "./components/message-input/MessageInput";
import Chat from "./components/chat/Chat";

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
      messages: []
    };

    this.socket = new Socket(this.state.user);
  }

  componentDidMount() {
    this.socket.subscribeToMessages(this.setMessages);
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

  render() {
    const { user, message, messages } = this.state;
    return (
      <div>
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
