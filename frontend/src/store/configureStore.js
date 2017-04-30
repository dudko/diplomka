import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TO_COMPARE'):
      state.push(action.results);
      return state; 
    default:
      return state; 
  }
}

const configureStore = () => createStore(
  reducer,
  applyMiddleware(logger, thunk)
);

export default configureStore;