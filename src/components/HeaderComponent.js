import React from "react";
import "./styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import db from "../firebase";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
    this.userSearch = this.userSearch.bind(this);
  }
  componentDidMount() {
    db.collection("user_data").onSnapshot((users) => {
      var userlist = [];
      users.forEach((doc) => userlist.push(doc.data()));
      this.setState({
        users: userlist,
        user: "",
      });
    });
  }
  userSearch() {
    var found = 0;
    this.state.users.forEach((user) => {
      if (user.user === this.state.user) found = 1;
    });
    if (found === 1) {
      alert("User is online");
    } else alert("User is offline");
  }
  render() {
    return (
      <div className="header">
        <div className="header_left">
          <img
            className="profile_pic"
            src={this.props.user?.picture}
            alt="profile_picture"
          />
          <p>{this.props.user?.name}</p>
        </div>
        <div className="header_main">
          <div onClick={this.userSearch}>
            <SearchIcon />
          </div>
          <input
            placeholder="Search for users"
            className="input"
            value={this.state.user}
            onChange={(e) => this.setState({ user: e.target.value })}
          />
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
