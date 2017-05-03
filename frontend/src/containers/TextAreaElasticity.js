import React, { Component } from 'react';

export default class TextAreaElasticity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elasticity: this.props.elasticity
        .map(row => `${row.map(cell => cell.value).join(' ')}`)
        .join('\n'),
      rowDelimiter: /\n/,
      cellDelimiter: /\s+/,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      elasticity: nextProps.elasticity
        .map(row => `${row.map(cell => cell.value).join(' ')}`)
        .join('\n')
    })
  }

  render() {
    const { elasticity, rowDelimiter, cellDelimiter } = this.state;
    const { setElasticity } = this.props;

    return (
      <div>
        <h4>Enter elasticity (stiffness tensor)</h4>
        <div
          className='flex'
        >
          <div
            className='half'
          >
            <h5
              className='tooltip-bottom'
              data-tooltip='regular expression' 
            >
              {'Row delimiter'}
            </h5>
            <input
              type='text'
              placeholder='default new line (\n)'
              onChange={(e) => this.setState({
                rowDelimeter: e.target.value
              })}
            />
          </div>
          <div
            className='half'
          >
            <h5
              className='tooltip-bottom'
              data-tooltip='regular expression' 
            >
              {'Cell delimiter'}
            </h5>
            <input
              type='text'
              placeholder='default space (\s+)'
              onChange={(e) => this.setState({
                cellDelimiter: new RegExp(e.target.value)
              })}
            />
          </div>
        </div>
        <textarea
          rows={6}
          value={elasticity}
          onChange={(e) => this.setState({ elasticity: e.target.value })}
          onBlur={(e) => setElasticity(e.target.value
            .split(rowDelimiter)
            .map(row => row.trim().split(cellDelimiter)
          ))}
        />
      </div>
    )
  }
}