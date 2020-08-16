import React from "react";
import "./styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
          <img className="profile_pic" src={this.props.user?.picture} />
          <p>{this.props.user?.name}</p>
        </div>
        <div className="header_main">
          <SearchIcon />
          <input placeholder="Search for users" className="input" />
        </div>
        <div className="header_right">
          <h2>ChatCord</h2>
          <div className="logout_box" onClick={this.props.logout}>
            <ExitToAppIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
