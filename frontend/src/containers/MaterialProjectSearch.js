import React, { Component } from 'react';
import SearchResult from '../components/SearchResult';
import { BASE_URL } from '../constants/URLs';

export default class MaterialProjectSearch extends Component {
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
    fetch(`${BASE_URL}/api/searchMaterialProject/${keyword}`)
    .then(response => response.status !== 200 ? [] : response.json())
    .then(result => this.setState({
        searchResults: result,
        searching: false
    }))
    .catch((e) => {
      console.error(e);
      this.setState({
        searchResults: [],
        searching: false
      });
    });
  }

  render() {
    const { searchResults, keyword, searching } = this.state; 
    const { setElasticity } = this.props; 
    return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.searchMaterial(keyword);
            this.setState({
              searching: true
            });
          }}
        >
          <input
            type='text'
            placeholder='FeO'
            value={keyword}
            onChange={(e) => this.setState({keyword: e.target.value})}
          />
          <button
            type='button'
            disabled={searching}
            onClick={() => {
              this.searchMaterial(keyword);
              this.setState({
                searching: true
              })
            }}
          >
            {searching ? '🔎 Searching...' : '🔎 Search'}
          </button>
        </form>
      </div>

      {searchResults.length && !searching ?
        <div>
          <h2><span className='label success'>Number of results: {searchResults.length}</span></h2>
          {searchResults.map((material, index) =>
            <SearchResult
              key={index}
              material={material}
              setElasticity={setElasticity}
            />
          )}
        </div>
      : <h5>No results</h5>
      }
    </div>
    );
  }
}