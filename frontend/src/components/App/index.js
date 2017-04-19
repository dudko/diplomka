import React, { Component } from 'react';
import PhaseContainer from '../../containers/PhaseContainer';
import { connect } from 'react-redux';
import './index.css';
import { processPoints } from '../../actions';

const MyWorker = require('worker-loader!../../worker');

class App extends Component {
  componentWillMount() {
    this.worker = new MyWorker();
  }

  render() {
    const { dispatch } = this.props;
    // this.worker.postMessage([ [ 25,-4,25,0,0,0 ],[ -4,25,25,0,0,0 ],[ 25,25,-4,0,0,0 ],[ 0,0,0,-7,0,0 ],[ 0,0,0,0,-7,0 ],[ 0,0,0,0,0,14 ] ]);
    this.worker.onmessage = msg => dispatch(processPoints(msg.data));

    return (
      <div className="container">
        <PhaseContainer
          postMessage={this.worker}
        />
      </div>
    );
  }
}

export default connect()(App);
