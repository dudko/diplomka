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
    const { setFraction, invalidFraction } = this.props;

    return (
      <div>
        <h3 className="ui horizontal divider header">Fraction</h3>
        <div className="ui form error">
          {invalidFraction &&
            <div className="ui error message">
              <ul className="list">
                <li>Sum of fractions is not 1</li>
              </ul>
            </div>}
          <div className="field">
            <label>
              {"A value within the range <0, 1>"}
            </label>
            <div className="ui action input">
              <input
                value={fraction}
                onChange={e =>
                  this.setState({
                    fraction: e.target.value
                  })}
                onBlur={() => setFraction(Number(fraction))}
              />
              <button
                className="ui blue button"
                onClick={() => setFraction(Number(fraction))}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
