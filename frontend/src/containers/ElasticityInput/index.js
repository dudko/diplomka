import React, { Component } from 'react';
import { connect } from 'react-redux';
import TensorInput from '../../components/TensorInput'
import { updateConst } from '../../actions';

class ElasticityInput extends Component {
  render() {
    const { id, elasticity, updateConst } = this.props;
    
    return (
      <div 
        className='six'
      >
      {elasticity.map((row, rowIndex) =>
        row.map((cell, columnIndex) => 
          <TensorInput
            key={`${rowIndex}${columnIndex}`}
            value={cell.value}
            updateConst={(value) =>
              updateConst(id, { row: rowIndex, column: columnIndex }, value)}
          />
      ))}
    </div>
  )}
}

const mapStateToProps = (state, ownProps) => ({
  elasticity: state.elasticities[ownProps.id]
})

const mapDispatchToProps = {
  updateConst
}

export default connect(mapStateToProps, mapDispatchToProps)(ElasticityInput);
