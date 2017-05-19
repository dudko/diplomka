import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';

// style
import '../node_modules/picnic/picnic.min.css';
import './index.css';



const store = configureStore();
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
