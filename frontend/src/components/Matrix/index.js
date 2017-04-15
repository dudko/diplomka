import React from 'react';
import Row from '../Row'
import './index.css';

const Matrix = ({ rowCount, columnCount }) => (
  <div className='matrix'>
    {[...Array(rowCount)].map((row, rowIndex) => 
      <Row
        key={rowIndex}
        rowIndex={rowIndex}
        columnCount={columnCount}
      />
    )}
  </div>
);

export default Matrix;
