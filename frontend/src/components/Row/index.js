import React from 'react';
import CellContainer from '../../containers/CellContainer';

const Row = ({ rowIndex, columnCount }) => (
  <div key={rowIndex}>
    {[...Array(columnCount)].map((column, columnIndex) => 
      <CellContainer
        key={columnIndex}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
      />
    )}
  </div>
);

export default Row;
