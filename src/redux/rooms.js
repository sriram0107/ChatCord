import * as Action_Types from "./ActionTypes";

export const rooms = (state = [], action) => {
  switch (action.type) {
    case Action_Types.ADD_ROOM:
      state.push(action.payload);
      return state;
    case Action_Types.CURRENT_ROOM:
      return action.payload;
    default:
      return state;
  }
};
