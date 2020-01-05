// Modules
import React, { Component } from "react";
import ReactDOM from "react-dom";

// API
import Socket from "./Socket";

class App extends Component {
  constructor() {
    super();

    this.socket = new Socket();
  }

  render() {
    return <div>hello world</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
