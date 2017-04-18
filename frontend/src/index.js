import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';;
import { Provider } from 'react-redux';
import reducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import App from './components/App';
import './index.css';

const store = createStore(reducer, applyMiddleware(logger, thunk));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
