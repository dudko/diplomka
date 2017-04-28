import React, { Component } from 'react';
import './index.css';

export default class Matrix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tensors: this.props.elasticity.map(row => row.map(cell => cell))
    }
  }
  
  handleOnChange(event, index) {
    const updatedTensors = this.state.tensors.map(row => row.map(cell => cell));
    updatedTensors[index.row][index.column].value = event.target.value;

    return this.setState({
      tensors: updatedTensors
    })
  }

  handleOnBlur(id, value, index) {
    const updatedTensors = this.state.tensors.map(row => row.map(cell => cell));
    updatedTensors[index.row][index.column].value = event.target.value;

    return this.setState({
      tensors: updatedTensors
    }, this.props.onCellChanged(id, value, index));
  }
  
  render() {
    const { id, rowCount, columnCount, elasticity, onCellChanged } = this.props;
    const { tensors } = this.state;
    
    return (
      <div 
        className='six'
      >
      {elasticity.map((row, rowIndex) =>
        row.map((cell, columnIndex) => 
          <input
            key={`${rowIndex}${columnIndex}`}
            value={cell.value}
            onChange={(e) => this.handleOnChange(e, { row: rowIndex, column: columnIndex })}
            onBlur={(e) => this.handleOnBlur(id, e.target.value, { row: rowIndex, column: columnIndex })}
          />
      ))}
    </div>
  )}
}
