import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as ActionTypes from '../constants/ActionTypes';

import _ from 'lodash';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_COMPOSITE: {
      const nextState = _.cloneDeep(state);
      nextState.push(action.matrix);
      return nextState;
    }
    case ('UPDATE_COMPARED'): {
      return action.results;
    }
    default: {
      return state;
    }
  }
};

const configureStore = () => createStore(
  reducer,
  applyMiddleware(logger, thunk)
);

export default configureStore;
