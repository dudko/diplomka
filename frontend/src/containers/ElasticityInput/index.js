import React, { Component } from 'react';
import TensorInput from '../../components/TensorInput'

export default class ElasticityInput extends Component {
  render() {
    const { elasticity, setConstant } = this.props;
    
    return (
      <div 
        className='six'
      >
      {elasticity.map((row, rowIndex) =>
        row.map((cell, cellIndex) => 
          <TensorInput
            key={`${rowIndex}${cellIndex}`}
            value={cell.value}
            setConstant={(value) =>
              setConstant(value, { row: rowIndex, cell: cellIndex })}
          />
      ))}
    </div>
  )}
}


