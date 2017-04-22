import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers'
const MyWorker = require('worker-loader!../worker');

const initialState = {
  reducer : {
    crystalSystem: 'unknown',
    elasticity: [0, 1, 2, 3, 4, 5].map(row =>
      [0, 1, 2, 3, 4, 5].map(cell =>
        ({ value: 0, disabled: false })
      )),
    worker: new MyWorker(),
  },
  points: {
    x: [],
    y: [],
    z: [],
    Y: [],
  }
}

const configureStore = () => createStore(
  reducer,
  initialState,
  applyMiddleware(logger, thunk)
);

export default configureStore;
