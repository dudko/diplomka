import React, { Component } from 'react';

export default class ColorbarRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: '',
      max: '',
    };
  }

  render() {
    const { min, max } = this.state;
    const { setColorbarRange } = this.props;

    return (
      <div
        className="flex fourth"
        style={{
          alignItems: 'baseline',
        }}
      >

        <span className="half">
          {'Colorbar range:'}
        </span>
        <div className="half">
          <div className="two">
            <input
              type="number"
              value={min}
              onChange={e => this.setState({ min: e.target.value })}
              onBlur={e => setColorbarRange({ min: e.target.value })}
              placeholder="min"
            />
            <input
              type="number"
              value={max}
              onChange={e => this.setState({ max: e.target.value })}
              onBlur={e => setColorbarRange({ max: e.target.value })}
              placeholder="max"
            />
          </div>
        </div>

      </div>
    );
  }
}
