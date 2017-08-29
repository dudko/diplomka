import React, { Component } from "react";
import SearchResult from "../components/SearchResult";

export default class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      keyword: "",
      searching: false
    };

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(keyword) {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/searchMaterialProject/${keyword}`
    )
      .then(response => (response.status !== 200 ? [] : response.json()))
      .then(result =>
        this.setState({
          searchResults: result,
          searching: false
        })
      )
      .catch(e => {
        console.error(e);
        this.setState({
          searchResults: [],
          searching: false
        });
      });
  }

  render() {
    const { searchResults, keyword, searching } = this.state;
    const { setMatrix } = this.props;
    return (
      <div>
        <div
          style={{
            paddingBottom: "0.6em"
          }}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              this.searchMaterial(keyword);
              this.setState({
                searching: true
              });
            }}
          >
            <h1 className="ui header">
              Search in external database
              <div className="sub header">
                A Keyword search looks for words anywhere in the record of the{" "}
                <a href="https://www.materialsproject.org/" target="_blank">
                  Materials Project
                </a>{" "}
                database.
              </div>
            </h1>

            <div className="ui action left icon fluid input">
              <i className="search icon" />
              <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={e => this.setState({ keyword: e.target.value })}
              />
              <button
                className={
                  "ui blue " + (searching ? "loading " : "") + "button"
                }
                onClick={() => {
                  this.searchMaterial(keyword);
                  this.setState({
                    searching: true
                  });
                }}
              >
                Search
              </button>
            </div>
            <div />
          </form>
        </div>

        {searchResults.map((material, index) =>
          <SearchResult key={index} material={material} setMatrix={setMatrix} />
        )}
      </div>
    );
  }
}
