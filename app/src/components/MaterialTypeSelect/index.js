import React, { Component } from 'react';

class MaterialTypeSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materialTypes: ['unknown', 'cubic']
    }

    this.materialTypeChanged = this.materialTypeChanged.bind(this);
  }

  materialTypeChanged(event) {
    const typeName = event.target.value;
    let newMaterial = this.props.getMaterial();

    if (typeName !== newMaterial.type) {
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

          newMaterial.constants = this.props.diagonalSymmetry(newMaterial.constants);

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

      this.props.setMaterial(newMaterial);
    }
  }

  render() {
    const { materialTypes } = this.state;
    
    return (
      <select
        onChange={this.materialTypeChanged}
      >
        {materialTypes.map(type =>
          <option key={type} value={type}>{type}</option>)}
      </select>
    );
  }
}

export default MaterialTypeSelect;