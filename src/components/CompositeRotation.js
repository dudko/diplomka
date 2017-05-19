import React, { Component } from 'react';

export default class CompositeRotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0, 1],
    };
  }

  render() {
    const { rotation } = this.state;
    const { updateRotation } = this.props;

    return (
      <div>
        <h4
          className="tooltip-right"
          data-tooltip="You may change here the internal crystallographic orientation of the two phases forming a coherent nano-composite as they are stacked on top of each other."
        >
          Rotation:</h4>
        <div className="three">
          {rotation.map((value, index) =>
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => {
                const nextRotation = [...rotation];
                nextRotation[index] = e.target.value;
                this.setState({ rotation: nextRotation });
              }}
              onBlur={() => updateRotation(rotation)}
            />,
          )}
        </div>
      </div>
    );
  }
}
