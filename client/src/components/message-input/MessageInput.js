import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const MessageInput = ({ handleSubmit, input }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Type a message"
          value={input.value}
          onChange={input.onChange}
          autoFocus
        />
        <button className="hidden" />
      </form>
    </div>
  );
};

MessageInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  })
};

export default MessageInput;
