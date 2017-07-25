import React, { Component } from "react";

export default class CompositeRotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: props.rotation
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      rotation: nextProps.rotation
    };
  }

  render() {
    const { rotation } = this.state;
    const { rotateMatrix, resetMatrix, rotated } = this.props;

    return (
      <div>
        <h4>Rotation</h4>

        <div className="ui fluid action input">
          {rotation.map((value, index) =>
            <input
              key={index}
              value={value}
              type="text"
              onChange={e => {
                const nextRotation = [...rotation];
                nextRotation[index] = e.target.value;
                this.setState({ rotation: nextRotation });
              }}
            />
          )}

          {rotated
            ? <button
                className="ui red icon button"
                onClick={() => resetMatrix()}
              >
                <i className="undo icon" /> Reset
              </button>
            : <button
                className="ui blue icon button"
                onClick={() => rotateMatrix(rotation)}
              >
                <i className="refresh icon" /> Rotate
              </button>}
        </div>
      </div>
    );
  }
}
