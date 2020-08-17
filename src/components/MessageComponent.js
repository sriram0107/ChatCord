import React from "react";
import db from "../firebase";
import "./styles/message.css";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomMessages: null,
      new_message: "",
    };
  }
  key = 0;
  onSubmit = (e) => {
    e.preventDefault();
    var message = {
      username: this.props.user.name,
      message: this.state.new_message,
      picture: this.props.user.picture,
      time: Date.now(),
    };
    this.setState({ new_message: "" });
    db.collection("room_data")
      .doc(this.props.room)
      .collection("messages")
      .add(message)
      .catch((err) => alert(err));
  };

  componentDidMount() {
    db.collection("room_data")
      .doc(this.props.room)
      .collection("messages")
      .orderBy("time", "asc")
      .onSnapshot((messages) => {
        var message_list = [];
        messages.forEach((message) => {
          message_list.push(message.data());
        });
        this.setState({ roomMessages: message_list });
      });
  }

  render() {
    const messageDisplay = this.state.roomMessages?.map((message) => {
      this.key += 1;
      return (
        <li key={this.key} className="message_body">
          <div className="main_message">
            <img src={message.picture} className="profile_pic" alt="pic" />
            <div className="message_body">
              <div className="message_header">
                <strong>{message.username}</strong>
                <i>{"  " + new Date(message.time).toUTCString()}</i>
              </div>
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
          <input
            type="text"
            placeholder={`Send message to #${this.props.room}`}
            className="input"
            value={this.state.new_message}
            onChange={(e) => this.setState({ new_message: e.target.value })}
          />
          <button onClick={this.onSubmit}>Send</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Message;
