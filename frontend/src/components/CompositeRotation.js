import React, { Component } from 'react';

export default class CompositeRotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0, 1]
    }
  }

  render() {
    const { rotation } = this.state;
    const { updateRotation } = this.props;

    return (<div>
      <h5>
        Rotation
      </h5>
      {rotation.map((value, index) =>
        <input
          key={index}
          type='number'
          value={value}
          onChange={(e) => {
            const nextRotation = [...rotation];
            nextRotation[index] = e.target.value;
            this.setState({ rotation: nextRotation })}
          }
          onBlur={(e) => updateRotation(rotation)}
        />
      )}
    </div>);
  }
}