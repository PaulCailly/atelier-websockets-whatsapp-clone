// Modules
import React, { Component } from "react";
import ReactDOM from "react-dom";

// API
import Socket from "./Socket";

// Components
import MessageInput from "./components/message-input/MessageInput";

// Styles
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };

    this.socket = new Socket();
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const message = {
      timestamp: new Date(),
      content: this.state.message
    };

    this.socket.sendMessage(message);

    this.setState({ message: "" });
  };

  render() {
    const { message } = this.state;
    return (
      <div>
        <MessageInput
          input={{ value: message, onChange: this.handleChange }}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
