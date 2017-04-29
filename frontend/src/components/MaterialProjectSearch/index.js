import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceElasticityWithFound } from '../../actions';
import Button from '../Button';
import SearchResult from '../SearchResult';

class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      searchResults : [],
      keyword: ''
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
    const { searchResults, keyword } = this.state; 
    const { replaceElasticityWithFound, elasticityId } = this.props; 
    return (
    <div>
      <div>
        <input
          type='text'
          value={keyword}
          onChange={(e) => this.setState({keyword: e.target.value})}
        />
        <Button
          onClick={() => this.searchMaterial(keyword)}
        >
          Search
        </Button>
      </div>

      {searchResults.length ?
        <div>
          {searchResults.map((material, index) =>
            <SearchResult
              key={index}
              material={material}
              onClick={(elasticity, crystalSymetry) =>
                replaceElasticityWithFound(elasticityId, elasticity, crystalSymetry)}
            />
          )}
        </div>
      : <p>No results</p>
      }
    </div>
    );
  }
}

const mapDispatchToProps = {
  replaceElasticityWithFound
}

export default connect(null, mapDispatchToProps)(MaterialProjectSearch);
