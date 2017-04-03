import React, { Component } from 'react';
import './index.css';
import MaterialConstantsForm from '../MaterialConstantsForm';
import MaterialProjectSearch from '../MaterialProjectSearch';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <MaterialConstantsForm />
        <hr/>
        <MaterialProjectSearch />
      </div>
    );
  }
}

export default App;
