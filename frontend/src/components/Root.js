import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SingleMaterial from '../containers/SingleMaterial';
import Composite from '../containers/Composite';
import Navigation from './Navigation';

const Root = () => (
  <Router>
    <main>
      <Navigation />
      <section
        className='flex four-fifth'
        style={{margin: '0 auto'}}
      >
        <Route exact path='/' component={SingleMaterial} />
        <Route path='/composite' component={Composite} />
      </section>
    </main>
  </Router>  
);

export default Root;
