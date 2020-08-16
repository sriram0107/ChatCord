import React from "react";
import { messages } from "../data";
import profile_picture from "../images/profile_picture.png";
import db from "../firebase";
import "./styles/message.css";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      new_message: "",
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    var message = {
      username: this.props.user.name,
      message: this.state.new_message,
      picture: this.props.user.picture,
    };
    this.setState({ new_message: "" });
    db.collection("room_data")
      .doc(this.props.room)
      .collection("messages")
      .add(message)
      .catch((err) => alert(err));
  };

  componentDidMount() {
    db.collection("rooms")
      .doc(this.props.room)
      .collection("messages")
      .get()
      .then((messages) => {
        var message_list = [];
        messages.forEach((message) => message_list.push(message.data()));
        this.setState({ message: message_list });
      })
      .catch((err) => console.log(err));
  }
  // componentDidUpdate(prevProps, prevState) {
  //   db.collection("rooms")
  //     .doc(this.props.room)
  //     .get()
  //     .then((messages) => this.setState({ message: messages }))
  //     .catch((err) => console.log(err));
  // }
  render() {
    const messageDisplay = this.state.messages?.map((message) => {
      return (
        <li>
          <div className="main_message">
            <img src={message.picture} className="profile_pic" alt="pic" />
            <div className="message_body">
              <strong>{message.username}</strong>
              <p>{message.message}</p>
            </div>
            <i>{message.time}</i>
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
