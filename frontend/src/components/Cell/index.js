import React from 'react';
import './index.css';

const Cell = ({ rowIndex, columnIndex, phase, onCellChanged }) => (
  <input
    className='cell'
    key={`${rowIndex}${columnIndex}`}
    value={phase.elasticity[rowIndex][columnIndex].value || 0}
    onChange={(event) => onCellChanged(event.target.value,
      { row: rowIndex, column: columnIndex })}
  />

);

export default Cell;
