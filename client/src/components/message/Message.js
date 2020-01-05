import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.css";

const addZero = i => (i < 10 ? "0" + i : i);

const Message = ({ sender, content, timestamp, direction }) => {
  const hours = addZero(timestamp.getHours());
  const minutes = addZero(timestamp.getMinutes());

  const formattedTimestamp = `${hours}:${minutes}`;
  return (
    <div className={classnames("row", [direction])}>
      <div className={classnames("message", [direction])}>
        <div className="sender-name">{sender.name}</div>
        <div>{content}</div>
        <div className="timestamp">{formattedTimestamp}</div>
      </div>
    </div>
  );
};

Message.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  sender: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  direction: PropTypes.oneOf(["incoming", "outgoing"])
};

export default Message;
