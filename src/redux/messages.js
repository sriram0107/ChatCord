import * as Action_Types from "./ActionTypes";

export const messages = (state = [], action) => {
  switch (action.type) {
    case Action_Types.ADD_MESSAGE:
      state.push(action.payload);
      return state;
    case Action_Types.SWITCH_MESSAGES_ROOM:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
