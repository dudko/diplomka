import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompositeRotation from '../components/CompositeRotation';

// eslint-disable-next-line
const CreateWorker = require('worker-loader!../worker');

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0, 1]
    }
  }

  render() {
    const { elasticity } = this.state;

    return (
      <CompositeRotation
        updateRotation={(rotation) => this.setState({
          rotation
        })}
      />
    );
  }
}

export default connect()(Adjust);
