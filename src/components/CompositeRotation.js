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
    const { setRotation, rotateMatrix } = this.props;

    return (
      <div>
        <h4>
          Rotation:
        </h4>
        <div className="four">
          {rotation.map((value, index) =>
            <input
              key={index}
              value={value}
              onChange={e => {
                const nextRotation = [...rotation];
                nextRotation[index] = e.target.value;
                this.setState({ rotation: nextRotation });
              }}
              onBlur={() => setRotation(rotation)}
            />
          )}
          <button
            className="sixth"
            style={{
              margin: 0
            }}
            onClick={() => rotateMatrix(rotation)}
          >
            <i className="fa fa-refresh" />
          </button>
        </div>
      </div>
    );
  }
}
