import React from "react";
import { messages } from "../data";
import profile_picture from "../images/profile_picture.png";
import "./message.css";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: messages.instagram,
    };
  }

  render() {
    const messageDisplay = this.state.messages.map((message) => {
      return (
        <li>
          <div className="main_message">
            <img src={profile_picture} className="profile_pic" />
            <div className="message_body">
              <strong>{message.username}</strong>
              <p>{message.message}</p>
            </div>
          </div>
        </li>
      );
    });
    return (
      <React.Fragment>
        <div className="allmess">
          <ul> {messageDisplay} </ul>
        </div>
        <div className="message_input">
          <input placeholder="Send message" className="input" />
        </div>
      </React.Fragment>
    );
  }
}

export default Message;
