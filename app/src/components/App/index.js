import React, { Component } from 'react';
import './index.css';
import MaterialConstantsForm from '../MaterialConstantsForm';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <MaterialConstantsForm />
      </div>
    );
  }
}

export default App;
