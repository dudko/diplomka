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
        <h3 className="ui horizontal divider header">
          Fraction
        </h3>
        <div className="ui input">
          <input
            value={fraction}
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
