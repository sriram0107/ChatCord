import React from "react";
import Header from "./HeaderComponent";
import Nav from "./NavComponent";
import "./App.css";
import { Switch, Redirect, Route } from "react-router";
import { rooms, user, room_users } from "../data";
import Message from "./MessageComponent";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user,
      rooms: rooms,
      room_users: room_users,
    };
  }

  render() {
    const message = ({ match }) => {
      if (match) {
        console.log(match.params.roomid);
        return <Message />;
      } else {
        return <div></div>;
      }
    };
    return (
      <div className="body">
        <Header user={this.state.user} />
        <div className="content">
          <Nav rooms={this.state.rooms} users={this.state.room_users} />
          <div className="test">
            <Switch>
              <Route exact path="/:roomid" component={message} />
              <Redirect to="/instagram" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
