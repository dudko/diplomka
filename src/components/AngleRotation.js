import React, { Component } from "react";

export default class AngleRotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: props.angle
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      angle: nextProps.angle
    };
  }

  render() {
    const { angle } = this.state;
    const { rotateByAngle, rotated, resetMatrix } = this.props;

    return (
      <div>
        <h4>Angle</h4>
        <div className="ui action input">
          <input
            value={angle}
            className="fifth"
            onChange={e =>
              this.setState({
                angle: e.target.value
              })}
          />

          {rotated
            ? <button
                className="ui red icon button"
                onClick={() => resetMatrix()}
              >
                <i className="undo icon" />
              </button>
            : <button
                className="ui blue icon button"
                onClick={() => rotateByAngle(angle)}
              >
                <i className="refresh icon" />
              </button>}
        </div>
      </div>
    );
  }
}
