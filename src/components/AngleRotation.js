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
        <div className="two">
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
                className="warning fifth"
                style={{
                  margin: 0
                }}
                onClick={() => resetMatrix()}
              >
                <i className="fa fa-undo" />
              </button>
            : <button
                className="fifth"
                style={{
                  margin: 0
                }}
                onClick={() => rotateByAngle(angle)}
              >
                <i className="fa fa-refresh" />
              </button>}
        </div>
      </div>
    );
  }
}
