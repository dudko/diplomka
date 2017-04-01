import React, { Component } from 'react';
import './index.css';

// import {
//   CUBIC_EXAMPLE,
//   API_BASE_URL
//  } from '../../constants';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      material: {
        type: 'unknown',
        constants: [0, 1, 2, 3, 4, 5].map(row =>
          [0, 1, 2, 3, 4, 5].map(cell =>
            ({ value: null, disabled: false })
        ))
       }
    };

    this.constEntered = this.constEntered.bind(this);
    this.materialTypeChanged = this.materialTypeChanged.bind(this);
    this.diagonalSymmetry = this.diagonalSymmetry.bind(this);
  }

  constEntered(event) {
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

  materialTypeChanged(event) {
    const typeName = event.target.value;
    let newMaterial = {...this.state.material};

    if (typeName !== this.state.material.type) {
      switch (typeName) {
        case 'cubic':
          newMaterial.type = 'cubic';

          [[0, 3], [0, 4], [0, 5],
           [1, 3], [1, 4], [1, 5],
           [2, 3], [2, 4], [2, 5],
           [3, 4], [3, 5],
           [4, 5]
          ].forEach(([row, cell]) => {
            newMaterial.constants[row][cell].disabled = true;
            newMaterial.constants[row][cell].value = '0';
          });
          
          let row = 5; 
          while(row) {
            let cell = row-1;
            while(cell >= 0) {
              newMaterial.constants[row][cell].disabled = true;
              cell -= 1;
            }
            row -= 1;
          }

          newMaterial.constants = this.diagonalSymmetry(newMaterial.constants);

          break;
        default:
          newMaterial = {
            type: 'unknown',
            constants: [0, 1, 2, 3, 4, 5].map(row =>
              [0, 1, 2, 3, 4, 5].map(cell =>
                ({ value: newMaterial.constants[row][cell].value || '', disabled: false })
            ))
          }
      }

      this.setState({
        material: newMaterial
      });
    }
  }

  render() {
    const { material } = this.state;

    return (
      <div className="page">
        <select
          onChange={this.materialTypeChanged}
        >
          {['unknown', 'cubic']
            .map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        
        <form>
          {material.constants.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <input
                  key={`${rowIndex}-${cellIndex}`}
                  name={`${rowIndex}-${cellIndex}`}
                  value={cell.value || ''}
                  onChange={this.constEntered}
                  disabled={cell.disabled}
                 />
              ))}
            </div>
          ))}
          
          <button
            onClick={this.submitConsts}
            type='button'
          >
            Submit
          </button>       
        </form>

        
      </div>
    );
  }

  
}

export default App;
