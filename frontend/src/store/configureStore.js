import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers'
const MyWorker = require('worker-loader!../worker');

const initialState = {
  worker: new MyWorker(),
  points: {
    x: [],
    y: [],
    z: [],
    Y: [],
  },
  elasticities: {
    '1': [0, 1, 2, 3, 4, 5].map(row =>
          [0, 1, 2, 3, 4, 5].map(cell =>
            ({ value: 0, disabled: false })
          )),
    '2': [0, 1, 2, 3, 4, 5].map(row =>
          [0, 1, 2, 3, 4, 5].map(cell =>
            ({ value: 0, disabled: false })
        )),
    '3': [0, 1, 2, 3, 4, 5].map(row =>
      [0, 1, 2, 3, 4, 5].map(cell =>
        ({ value: 0, disabled: false })
      )),
  }
}

const configureStore = () => createStore(
  reducer,
  initialState,
  applyMiddleware(logger, thunk)
);

export default configureStore;
