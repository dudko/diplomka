import React, { Component } from 'react';

export default class InputConstant extends Component {
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
    const { setConstant } = this.props;
    const { value } = this.state;

    return (<input
      value={value}
      style={{textAlign: 'center'}}
      onChange={(e) => this.setState({ value: e.target.value })}
      onBlur={(e) => setConstant(e.target.value)}
    />);
  }
}