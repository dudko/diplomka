import React from 'react';
import './index.css';

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const Cell = ({ rowIndex, columnIndex, phase, onCellChanged }) => (
  <input
    className='cell'
    key={`${rowIndex}${columnIndex}`}
    value={isNumeric(phase.elasticity[rowIndex][columnIndex].value) ?
      phase.elasticity[rowIndex][columnIndex].value : ''}
    onChange={(event) => onCellChanged(event.target.value,
      { row: rowIndex, column: columnIndex })}
  />

);

export default Cell;
