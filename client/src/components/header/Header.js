import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import "./logo_wildcodeschool.jpg";

const Header = ({ connectedUsers }) => {
  return (
    <div className="header">
      <div className="header__room-picture"></div>
      <div>
        <div className="header__room-name">Wild Code School workshop</div>
        <div className="header__room-connected-users">
          {connectedUsers.map(user => user.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  connectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default Header;
