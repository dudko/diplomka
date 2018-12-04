import React, { Component } from "react";

export default class Rotations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axes: props.axes,
      angle: props.angle,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      axes: nextProps.axes,
      angle: nextProps.angle,
    });
  }

  render() {
    const { axes, angle } = this.state;
    const { rotateMatrix, resetMatrix } = this.props;

    return (
      <div>
        <h3 className="ui horizontal divider header">Axes and angle</h3>

        <div className="ui five column center aligned grid">
          {["x", "y", "z", "", "angle"].map(text => (
            <div className="column" key={text}>
              <b>{`${text}`}</b>
            </div>
          ))}
        </div>

        <div className="ui five column grid">
          {axes.map((value, index) => (
            <div className="column" key={index}>
              <div className="ui input">
                <input
                  value={value}
                  style={{
                    width: "60px",
                  }}
                  type="text"
                  onChange={e => {
                    const nextAxes = [...axes];
                    nextAxes[index] = e.target.value;
                    this.setState({ axes: nextAxes });
                  }}
                />
              </div>
            </div>
          ))}

          <span className="column" />
          <div className="column">
            <div className="ui right labeled input">
              <input
                type="text"
                style={{
                  width: "40px",
                }}
                value={angle}
                onChange={e => this.setState({ angle: e.target.value })}
              />
              <div className="ui label">°</div>
            </div>
          </div>
        </div>

        <div className="ui centered aligned grid">
          <div
            className="ui blue icon button"
            onClick={() => rotateMatrix(axes, angle)}
          >
            <i className="refresh icon" /> Rotate
          </div>
          <div className="ui red icon button" onClick={() => resetMatrix()}>
            <i className="undo icon" /> Reset
          </div>
        </div>
      </div>
    );
  }
}
