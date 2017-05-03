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
      <h4>Composite ratio:</h4>
      <div className='two'>
        <input
          value={ratio}
          type='number'
          onChange={(e) => this.setState({ ratio: e.target.value })}
          onBlur={(e) => updateRatio(e.target.value)}
        />
        <input
          style={{
            background: '#bbb'
          }}
          type='number'
          value={1.0-ratio}
          disabled={true}
        />
      </div>
    </div>);
  }
}