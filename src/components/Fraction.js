import React, { Component } from "react";

export default class Fraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fraction: props.fraction
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      fraction: nextProps.fraction
    };
  }

  render() {
    const { fraction } = this.state;
    const { setFraction } = this.props;

    return (
      <div>
        <h4>Fraction</h4>
        <div className="two">
          <input
            value={fraction}
            className="fifth"
            onChange={e =>
              this.setState({
                fraction: e.target.value
              })}
            onBlur={() => setFraction(Number(fraction))}
          />
        </div>
      </div>
    );
  }
}
