import React from "react";
import PropTypes from "prop-types";
import Message from "../message/Message";
import "./styles.css";

const Chat = ({ messages }) => {
  return (
    <div>
      <div className="chat-background">
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.instanceOf(Date).isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }),
      direction: PropTypes.oneOf(["incoming", "outgoing"])
    })
  )
};

export default Chat;
