import React from "react";
import Header from "./HeaderComponent";
import Nav from "./NavComponent";
import "./styles/App.css";
import { Switch, Redirect, Route, withRouter } from "react-router";
import { connect } from "react-redux";
import Message from "./MessageComponent";
import Home from "./HomeComponent";
import db from "../firebase";
import Loading from "./Loading";
import { auth, provider } from "../firebase";
import { addNewUser, logoutUser } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
  addNewUser: (user) => dispatch(addNewUser(user)),
  logoutUser: (user) => dispatch(logoutUser(user)),
});
const mapStateToProps = (state) => ({
  user: state.user,
  rooms: state.rooms,
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
    this.onlogout = this.onlogout.bind(this);
  }

  onlogin = (user) => {
    this.props.addNewUser(user);
  };

  onlogout = () => {
    this.props.logoutUser(this.props.user);
  };

  render() {
    const message = ({ match }) => {
      if (match) {
        console.log(match.params.roomid);
        return <Message room={match.params.roomid} user={this.props.user} />;
      } else {
        return <div></div>;
      }
    };
    if (!this.props.user) {
      return <Loading onlogin={this.onlogin} />;
    } else {
      return (
        <div className="body">
          <Header user={this.props.user} logout={this.onlogout} />
          <div className="content">
            <Nav />
            <div className="test">
              <Switch>
                <Route exact path="/" component={() => <Home />} />
                <Route exact path="/room/:roomid" component={message} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
