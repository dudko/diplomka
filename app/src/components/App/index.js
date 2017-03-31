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
      material: {},
      type: ''
    }
  
    this.submitConsts = this.submitConsts.bind(this);
    this.constEntered = this.constEntered.bind(this);
    this.typeSelected = this.typeSelected.bind(this);
  }

  submitConsts(event) {
    console.log(event)
  }

  constEntered(event) {
    const cell = event.target.attributes.name.nodeValue;
    const updatedMaterial = {
      ...this.state.material,
      [cell]: event.target.value
    };

    if (this.state.type) {
      updatedMaterial[`${cell[1]}${cell[0]}`] = updatedMaterial[`${cell[0]}${cell[1]}`]
    }
    
    this.setState({
      material: updatedMaterial
    });
  }

  typeSelected(event) {

    this.setState({
      type: event.target.value
    });
  }

  render() {
    const { material } = this.state;

    return (
      <div className="page">
        <h1>Elasticity Tool</h1>

        <select
          onChange={this.typeSelected}
        >
          <option defaultValue>Material type</option>
          {['cubic', 'hexagonal', 'tetragonal', 'trigonal', 'orthorombic']
            .map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        
        <form>
          {[0, 1, 2, 3, 4, 5].map(row => {
            return (
              <div key={row}>
              {[0, 1, 2, 3, 4, 5].map(col => 
                <input
                  key={`${row}${col}`}
                  name={`${row}${col}`}
                  value={material[`${row}${col}`] || ''}
                  onChange={this.constEntered}
                 />
              )}
              </div>
            );
          })}
          
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
