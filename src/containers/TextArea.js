import React, { Component } from 'react';

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stiffness: this.props.stiffness
        .map(row => `${row.join(' ')}`)
        .join('\n'),
      rowDelimiter: /\n/,
      cellDelimiter: /\s+/,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stiffness: nextProps.stiffness
        .map(row => `${row.join(' ')}`).join('\n'),
    });
  }

  render() {
    const { stiffness, rowDelimiter, cellDelimiter } = this.state;
    const { setElasticity } = this.props;

    return (
      <div>
        <h4>Enter stiffness matrix:</h4>
        <textarea
          rows={6}
          value={stiffness}
          onChange={e => this.setState({ stiffness: e.target.value })}
          onBlur={e => setElasticity(e.target.value
            .split(rowDelimiter)
            .map(row => row.trim().split(cellDelimiter),
          ))}
        />
        
        <div
          className="flex"
        >
          <div
            className="half"
          >
            <h5
              className="tooltip-bottom"
              data-tooltip="regular expression"
            >
              {'Row delimiter'}
            </h5>
            <input
              type="text"
              placeholder="default new line (\n)"
              onChange={e => this.setState({
                rowDelimeter: e.target.value,
              })}
            />
          </div>
          <div
            className="half"
          >
            <h5
              className="tooltip-bottom"
              data-tooltip="regular expression"
            >
              {'Cell delimiter'}
            </h5>
            <input
              type="text"
              placeholder="default space (\s+)"
              onChange={e => this.setState({
                cellDelimiter: new RegExp(e.target.value),
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}
