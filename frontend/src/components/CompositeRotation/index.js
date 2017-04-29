import React, { Component } from 'react';

export default class CompositeRotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      z: 0
    }
  }

  render() {
    const rotation = this.state;
    const { updateRotation } = this.props;

    return (<div>
      <h5
        data-tooltip='This is a great tooltip'
        className='tooltip-top'
      >
        Rotation
      </h5>
      {['x', 'y', 'z'].map(axis =>
        <input
          key={axis}
          type='number'
          value={rotation[axis]}
          onChange={(e) => this.setState({ [axis]: e.target.value })}
          onBlur={(e) => updateRotation({ [axis]: e.target.value })}
        />
      )}
    </div>);
  }
}