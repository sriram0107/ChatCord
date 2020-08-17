import * as Action_Types from "./ActionTypes";
import db from "../firebase";

export const addUser = (user) => ({
  type: Action_Types.ADD_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: Action_Types.DELETE_USER,
});
export const addRoom = (room) => ({
  type: Action_Types.ADD_ROOM,
  payload: room,
});

export const addMessage = (message) => ({
  type: Action_Types.ADD_MESSAGE,
  payload: message,
});

export const currentRoom = (rooms) => ({
  type: Action_Types.CURRENT_ROOM,
  payload: rooms,
});

export const switchMessagesRoom = (messages) => ({
  type: Action_Types.SWITCH_MESSAGES_ROOM,
  payload: messages,
});

export const addNewUser = (user) => (dispatch) => {
  dispatch(addUser(user));
  db.collection("user_data")
    .doc(user.name)
    .set({
      user: user.name,
      picture: user.picture,
    })
    .catch((err) => console.log(err));
};

export const logoutUser = (user) => (dispatch) => {
  dispatch(deleteUser());
  db.collection("user_data")
    .doc(user.name)
    .delete()
    .catch((err) => console.log(err));
};

export const addNewRoom = (room) => (dispatch) => {
  dispatch(addRoom(room));
  db.collection("room_data")
    .doc(room)
    .set({
      room: room,
    })
    .catch((err) => console.log(err));
};

export const currentRooms = (roomlist) => (dispatch) => {
  dispatch(currentRoom(roomlist));
};
