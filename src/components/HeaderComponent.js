import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import profile_picture from "../images/profile_picture.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <div className="header_left">
          <img className="profile_pic" src={profile_picture} />
          <p>{this.props.user.username}</p>
        </div>
        <div className="header_main">
          <SearchIcon />
          <input placeholder="Search for users" className="input" />
        </div>
        <div className="header_right">
          <h2>ChatCord</h2>
        </div>
      </div>
    );
  }
}

export default Header;
