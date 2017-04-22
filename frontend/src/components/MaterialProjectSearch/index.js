import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tensorsToSearchResult } from '../../actions';
import './index.css';
import Button from '../Button';


class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      searchResults : [],
      value: ''
    }

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(keyword) {
    fetch(`http://localhost:8080/api/searchMaterialProject/${keyword}`)
    .then(responce => responce.json())
    .then(result => this.setState({
        searchResults: result
    }))
    .catch(e => console.error(e));
  }

  render() {
    const { searchResults, value } = this.state; 
    const { dispatch, tensorsId } = this.props; 
    return (
    <div
      className='material-project-search'
    >
      <input
        type='text'
        value={value}
        onChange={(event) => this.setState({value: event.target.value})}
      />
      <Button
        onClick={() => this.searchMaterial(value)}
      >
        Search
      </Button>
      {searchResults.length ?
        <div className="table">
          { searchResults.map((material, index) => 
            <div key={index} className="table-row" 
              onClick={() =>
                dispatch(tensorsToSearchResult(tensorsId, material['elasticity.elastic_tensor'], material['spacegroup.crystal_system']))}
            >
              <span style={{ width: '10%' }}>
                <a href='#'>{material.pretty_formula}</a>
              </span>
              <span style={{ width: '10%' }}>
                {material['spacegroup.crystal_system']}
              </span>
              <span style={{ width: '80%' }}>
                {'[ ' + material['elasticity.elastic_tensor']
                  .map(row => `[ ${row.join(',')} ]`)
                  .join(',') + ' ]'}
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

export default connect()(MaterialProjectSearch);
