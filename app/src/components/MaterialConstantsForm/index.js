import React, { Component } from 'react';
import { Button } from '../Button';
import MaterialTypeSelect from '../MaterialTypeSelect';
import './index.css';

class MaterialConstantsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      material: {
        type: 'unknown',
        constants:
          [0, 1, 2, 3, 4, 5].map(row =>
            [0, 1, 2, 3, 4, 5].map(cell =>
              ({ value: null, disabled: false })
          ))
       }
    }
    
    this.setMaterial = this.setMaterial.bind(this);
    this.getMaterial = this.getMaterial.bind(this);
    this.materialConstantChanged = this.materialConstantChanged.bind(this);
    this.diagonalSymmetry = this.diagonalSymmetry.bind(this);
  }

  getMaterial() {
    return {...this.state.material};
  }

  setMaterial(material) {
    this.setState({
      material
    })
  }

  render() {
    const { material } = this.state;

    return (
      <form
        className='material-constants-form'
      >
        <h4>Select material type:</h4>
        <MaterialTypeSelect
          className
          getMaterial={this.getMaterial}
          setMaterial={this.setMaterial}
          diagonalSymmetry={this.diagonalSymmetry}
        />

        {material.constants.map((row, rowIndex) => (
          <div
            key={rowIndex}
          >
            {row.map((cell, cellIndex) => (
              <input
                className='matrix-cell'
                key={`${rowIndex}-${cellIndex}`}
                name={`${rowIndex}-${cellIndex}`}
                value={cell.value || ''}
                onChange={this.materialConstantChanged}
                disabled={cell.disabled}
                />
            ))}
          </div>
        ))}
        
        <div 
          className='btn-group'
        >
        <Button
          onClick={() => console.log('click')}
        >
          Submit
        </Button>

        <Button
          onClick={() => console.log('click')}
        >
          Clear
        </Button>
        </div>

      </form>
    )
  }

  diagonalSymmetry(matrix) {
    let row = 0;
    while (row < 6) {
      let cell = row + 1;
      while (cell < 6) {
        matrix[cell][row].value = matrix[row][cell].value;
        cell += 1;
      }
      row += 1;
    }

    return matrix;
  }

  materialConstantChanged(event) {
    const [row, cell] = event.target.attributes.name.nodeValue.split('-');
    const newMaterial = {...this.state.material};

    newMaterial.constants[row][cell].value = event.target.value;
    if (this.state.material.type !== 'unknown') {
      newMaterial.constants = this.diagonalSymmetry(newMaterial.constants);
    }
    
    this.setState({
      material: newMaterial
    });
  }
}

export default MaterialConstantsForm;