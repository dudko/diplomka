import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PhaseContainer from '../../containers/PhaseContainer';
import CompositeContainer from '../../containers/CompositeContainer';
import Navigation from '../Navigation';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <main>
          <Navigation />
          <section
            className='flex four-fifth'
            style={{margin: '0 auto'}}
          >
            <Route exact path='/' component={PhaseContainer} />
            <Route path='/composite' component={CompositeContainer} />
          </section>
        </main>
      </Router>  
    </Provider>
);

export default Root;
