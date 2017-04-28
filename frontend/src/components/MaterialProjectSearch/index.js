import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tensorsToSearchResult } from '../../actions';
// import './index.css';
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
    >
      <div className=''>
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
      </div>
      {searchResults.length ?
        <div>
          { searchResults.map((material, index) => 
            <article key={index} className="card" 
              onClick={() =>
                dispatch(tensorsToSearchResult(tensorsId, material['elasticity.elastic_tensor'], material['spacegroup.crystal_system']))}
            >
              <header>
                <h3>
                  <a
                    href={`https://www.materialsproject.org/materials/${material.task_ids[0]}`}
                    target='_blank'
                  >
                    {material.task_ids[0]}
                  </a>
                </h3>
                <h3>{material.pretty_formula}</h3>
                <h3>{material['spacegroup.crystal_system']}</h3>
              </header>
              <footer>
                <table style={{tableLayout:'fixed',width:'100%'}}>
                  {material['elasticity.elastic_tensor'].map(row =>
                    <tr>{row.map(cell => <td>{cell}</td>)}</tr>)}
                </table>          
              </footer>
            </article>
          )}
        </div>
        : <p>No results</p>
      }
    </div>
    );
  }
}

export default connect()(MaterialProjectSearch);
