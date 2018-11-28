import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";

import reducer from "../reducers";

const configureStore = history =>
  createStore(
    reducer,
    applyMiddleware(thunk, logger, routerMiddleware(history))
  );

export default configureStore;
