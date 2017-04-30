import React, { Component } from 'react';

export default class CompositeRatio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0.5
    }
  }

  render() {
    const { ratio } = this.state;
    const { updateRatio } = this.props;

    return (<div>
      <h5>Composite ratio</h5>
      <input
        value={ratio}
        onChange={(e) => this.setState({ ratio: e.target.value })}
        onBlur={(e) => updateRatio(e.target.value)}
      />
      <input
        style={{
          background: '#bbb'
        }}
        value={1.0-ratio}
        disabled={true}
      />
    </div>);
  }
}