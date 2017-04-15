import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateToSearchResult } from '../../actions';
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
    const { dispatch } = this.props; 
    return (
    <div
      className='material-project-search'
    >
      <input
        type='text'
        onBlur={this.searchMaterial}
      />
      {searchResults.length ?
        <div className="table">
          { searchResults.map((material, index) => 
            <div key={index} className="table-row" 
              onClick={() =>
                dispatch(updateToSearchResult(material['elasticity.elastic_tensor'], material['spacegroup.crystal_system']))}
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
