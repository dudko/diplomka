import { createStore, applyMiddleware } from "redux";
import createWorkerMiddleware from "redux-worker-middleware";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";

import reducer from "../reducers";

// eslint-disable-next-line
const CreateWorker = require("worker-loader!../worker");

// prettier-ignore
const workerMiddleware = createWorkerMiddleware(new CreateWorker());

const configureStore = history =>
  createStore(
    reducer,
    applyMiddleware(thunk, workerMiddleware, logger, routerMiddleware(history))
  );

export default configureStore;
