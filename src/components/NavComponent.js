import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import profile_picture from "../images/profile_picture.png";
import "./nav.css";

var key = 0;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: true,
      key: 0,
    };
  }

  render() {
    const toggleNav = () => this.setState({ navOpen: !this.state.navOpen });
    const rooms = this.props.rooms.map((room) => {
      key += 1;
      return (
        <li key={key}>
          <a href={`/${room}`}>#{room}</a>
        </li>
      );
    });
    const users = this.props.users.map((user) => {
      key += 1;
      return (
        <li key={key}>
          <div className="users">
            <img className="profile_pic" src={profile_picture} />
            <a href="#">{user}</a>
          </div>
        </li>
      );
    });
    return (
      <React.Fragment>
        <div className="hamburger" onClick={toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={this.state.navOpen ? "sidebar" : "altsidebar"}>
          <div className="list">
            <ul>{rooms}</ul>
          </div>
          <div className="list">
            <a href="#">+ Add New Room</a>
          </div>
          <div className="list">
            <h2 className="member">Members</h2>
            <ul>{users}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
