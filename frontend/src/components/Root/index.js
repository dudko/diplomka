import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import PhaseContainer from '../../containers/PhaseContainer';
import CompositeContainer from '../../containers/CompositeContainer';
import Navigation from '../Navigation';
import './index.css';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div
          className='container'
        >
          <Navigation />
          <Route exact path='/' component={PhaseContainer} />
          <Route path='/composite' component={CompositeContainer} />
        </div>
      </Router>  
    </Provider>
);

export default Root;
