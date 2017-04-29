import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceElasticityWithFound } from '../../actions';
import Button from '../Button';
import SearchResult from '../SearchResult';
import Spinner from 'react-spinner';

class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      searchResults : [],
      keyword: '',
      searching: false
    }

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(keyword) {
    fetch(`http://localhost:8080/api/searchMaterialProject/${keyword}`)
    .then(responce => responce.json())
    .then(result => this.setState({
        searchResults: result,
        searching: false
    }))
    .catch(e => console.error(e));
  }

  render() {
    const { searchResults, keyword, searching } = this.state; 
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
          disabled={searching}
          onClick={() => {
            this.searchMaterial(keyword);
            this.setState({
              searching: true
            })
          }}
        >
          {searching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {searchResults.length && !searching ?
        <div>
          <article class="card">
            <header>
              <h5>Number of results: {searchResults.length}</h5>
            </header>
          </article>

          {searchResults.map((material, index) =>
            <SearchResult
              key={index}
              material={material}
              onClick={(elasticity, crystalSymetry) =>
                replaceElasticityWithFound(elasticityId, elasticity, crystalSymetry)}
            />
          )}
        </div>
      : <h5>No results</h5>
      }
    </div>
    );
  }
}

const mapDispatchToProps = {
  replaceElasticityWithFound
}

export default connect(null, mapDispatchToProps)(MaterialProjectSearch);