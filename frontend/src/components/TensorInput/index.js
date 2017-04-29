import React, { Component } from 'react';

export default class TensorInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  render() {
    const { value } = this.state;
    const { updateConst } = this.props;

    return (<input
      value={value}
      style={{textAlign: 'center'}}
      onChange={(e) => this.setState({ value: e.target.value })}
      onBlur={(e) => updateConst(e.target.value)}
    />);
  }
}