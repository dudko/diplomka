import React, { Component } from 'react';
import SearchResult from '../components/SearchResult';
import { BASE_URL } from '../constants/URLs';

export default class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      keyword: '',
      searching: false,
    };

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(keyword) {
    fetch(`${BASE_URL}/api/searchMaterialProject/${keyword}`)
    .then(response => response.status !== 200 ? [] : response.json())
    .then(result => this.setState({
      searchResults: result,
      searching: false,
    }))
    .catch((e) => {
      console.error(e);
      this.setState({
        searchResults: [],
        searching: false,
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
                searching: true,
              });
            }}
          >
            <h4
              className="tooltip-bottom"
              data-tooltip="materialsproject.org"
            >
              Search in external database:
            </h4>
            <div>
              <input
                className='two-third'
                type="text"
                placeholder='Search by formula (etc. "Fe" or "AlFe3")'
                value={keyword}
                onChange={e => this.setState({ keyword: e.target.value })}
              />
              <button
                className='third'
                style={{
                  margin: 0
                }}             
                type="button"
                disabled={searching}
                onClick={() => {
                  this.searchMaterial(keyword);
                  this.setState({
                    searching: true,
                  });
                }}
              >
              {searching ? '🔎 Searching...' : '🔎 Search'}
            </button>
          </div>
          </form>
        </div>

        <div
          style={{
            overflow: 'scroll',
            overflowX: 'hidden',
            maxHeight: '220px'
          }}        
        >

          {searchResults.map((material, index) =>
            <SearchResult
              key={index}
              material={material}
              setElasticity={setElasticity}
            />,
          )}
        </div>
      </div>
    );
  }
}
