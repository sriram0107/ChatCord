import React from "react";
import "./styles/login.css";
import { auth, provider } from "../firebase";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loginUser = this.loginUser.bind(this);
  }
  loginUser() {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        this.props.onlogin(user.additionalUserInfo.profile);
      })
      .catch((err) => alert(err));
  }
  render() {
    return (
      <div className="login__body">
        <div className="login__card">
          <h1 className="login__header">ChatCord</h1>
          <button class="login__button" onClick={this.loginUser}>
            Sign up with google
          </button>
        </div>
      </div>
    );
  }
}

export default Loading;
