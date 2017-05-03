import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import _ from 'lodash';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TO_COMPARE'):
      const nextState = _.cloneDeep(state);
      nextState.push(action.results);
      return nextState; 
    case ('UPDATE_COMPARED'):
      console.log(action.results);
      return action.results;
    default:
      return state; 
  }
}

const configureStore = () => createStore(
  reducer,
  applyMiddleware(logger, thunk)
);

export default configureStore;