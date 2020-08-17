import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import profile_picture from "../images/profile_picture.png";
import db from "../firebase";
import "./styles/nav.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNewRoom, currentRooms } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  addNewRoom: (room) => dispatch(addNewRoom(room)),
  currentRooms: () => dispatch(currentRooms()),
});
const mapStateToProps = (state) => ({
  rooms: state.rooms,
});

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: true,
      key: 0,
      users: null,
    };
    this.newRoom = this.newRoom.bind(this);
  }
  key = 0;
  newRoom() {
    const room_name = prompt("Enter new room name:");
    if (room_name) this.props.addNewRoom(room_name);
  }
  componentDidMount() {
    db.collection("user_data").onSnapshot((users) => {
      var userlist = [];
      users.forEach((doc) => userlist.push(doc.data()));
      this.setState({
        users: userlist,
      });
    });
    ////////
  render() {
    const toggleNav = () => this.setState({ navOpen: !this.state.navOpen });
    const rooms = this.props.rooms?.map((room) => {
      this.key += 1;
      return (
        <li key={this.key}>
          <Link to={`/room/${room}`}>#{room}</Link>
        </li>
      );
    });
    const users = this.state.users?.map((user) => {
      this.key += 1;
      return (
        <li key={this.key}>
          <div className="users">
            <img className="profile_pic" src={user.picture} alt="pic" />
            <Link to="#">{user.user}</Link>
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
            <Link to="#" onClick={this.newRoom}>
              + Add New Room
            </Link>
          </div>
          <div className="list">
            <h2 className="member">Online Users</h2>
            <ul>{users}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
