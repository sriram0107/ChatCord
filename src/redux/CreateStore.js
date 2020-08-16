import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rooms } from "./rooms";
import { user } from "./user";
import { messages } from "./messages";

export const CreateStore = () => {
  const store = createStore(
    combineReducers({
      rooms,
      user,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
