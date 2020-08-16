import * as Action_Types from "./ActionTypes";

export const user = (state = null, action) => {
  switch (action.type) {
    case Action_Types.ADD_USER:
      return action.payload;
    case Action_Types.DELETE_USER:
      state = null;
      return state;
    default:
      return state;
  }
};
