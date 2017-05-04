import React, { Component } from 'react';

export default class CompositeRatio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0.5,
    };
  }

  render() {
    const { ratio } = this.state;
    const { updateRatio } = this.props;

    return (
      <div>
        <h4
          className="tooltip"
          data-tooltip="Define the relative molar amount of the phase 1 in the composite."
        >Composite ratio:</h4>
        <div className="two">
          <input
            value={ratio}
            type="number"
            onChange={e => this.setState({ ratio: e.target.value })}
            onBlur={e => updateRatio(e.target.value)}
          />
          <input
            type="number"
            value={1.0 - ratio}
            disabled
          />
        </div>
      </div>
    );
  }
}
