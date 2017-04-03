import React, { Component } from 'react';
import { Button } from '../Button';
import './index.css';

class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : []
    }

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(event) {
    const keyword = event.target.value;
    fetch(`http://localhost:8080/api/searchMaterialProject/${keyword}`)
    .then(responce => responce.json())
    .then(result => this.setState({
        searchResults: result
    }))
    .catch(e => console.error(e));
  }

  render() {
    const { searchResults } = this.state; 
    return (
    <div
      className='material-project-search'
    >
      <h4>MaterialProject search</h4>
      <input
        type='text'
        onChange={this.searchMaterial}
      />
      {searchResults.length ?
        <div className="table">
          { searchResults.map(material => 
            <div key={material.material_id} className="table-row">
              <span style={{ width: '20%' }}>
                <a href={material.material_id}>{material.material_id}</a>
              </span>
              <span style={{ width: '80%' }}>
                {material.elasticity ? material.elasticity.elastic_tensor.toString() : 'No elasticity'}
              </span>
            </div>
          )}
        </div>
        : <p>No results</p>
      }
    </div>
    );
  }
}

export default MaterialProjectSearch;
