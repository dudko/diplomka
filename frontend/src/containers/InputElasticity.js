import React, { Component } from 'react';
import InputConstant from '../components/InputConstant'

export default class InputElasticity extends Component {
  render() {
    const { elasticity, setConstant } = this.props;
    
    return (
      <div 
        className='six'
      >
      {elasticity.map((row, rowIndex) =>
        row.map((cell, cellIndex) => 
          <InputConstant
            key={`${rowIndex}${cellIndex}`}
            value={cell.value}
            setConstant={(value) =>
              setConstant(value, { row: rowIndex, cell: cellIndex })}
          />
      ))}
    </div>
  )}
}


