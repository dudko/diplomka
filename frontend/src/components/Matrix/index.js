import React, { Component } from 'react';
import './index.css';

export default class Matrix extends Component {
  render() {
    const { id, rowCount, columnCount, elasticity, onCellChanged } = this.props;
    // const { elasticity } = this.state;
    return (
      <div className='matrix'>
      {elasticity.map((row, rowIndex) =>
        row.map((cell, columnIndex) => 
          <input
            className='cell'
            key={`${rowIndex}${columnIndex}`}
            value={cell.value}
            onChange={(e) => onCellChanged(id, e.target.value,
              { row: rowIndex, column: columnIndex })}
          />
      ))}
    </div>
  )}
}
