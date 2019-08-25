import React, { Component } from "react";
import SearchResult from "../components/SearchResult";

export default class MaterialProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      keyword: "",
      searching: false,
      noResults: false,
    };

    this.searchMaterial = this.searchMaterial.bind(this);
  }

  searchMaterial(keyword) {
    // fetch(
    //   `${process.env.REACT_APP_API_ENDPOINT}/material/search?keyword=${keyword}`
    // )
    //   .then(response => response.json())
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.materialsproject.org/rest/v1/materials/${keyword}/vasp?API_KEY=${process.env.REACT_APP_MATERIAL_PROJECT_API}`
    )
      .then(response => {
        if (response.status === 400) {
          throw new Error("no results");
        }
        return response.json();
      })
      .then(
        results =>
          (results.response &&
            results.response.filter(result => result.elasticity)) ||
          []
      )
      .then(results => {
        if (!results.length) {
          throw new Error("no results");
        }

        this.setState({
          searchResults: results,
          searching: false,
        });
      })
      .catch(err => {
        console.log(err);
        if (err.message === "no results") {
          this.setState({
            searching: false,
            noResults: true,
          });
        } else {
          this.setState({
            searchResults: [],
            searching: false,
          });
        }
      });
  }

  render() {
    const { searchResults, keyword, searching, noResults } = this.state;
    const { setMatrix } = this.props;
    return (
      <div>
        <div
          style={{
            paddingBottom: "0.6em",
          }}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              this.searchMaterial(keyword);
              this.setState({
                searching: true,
                noResults: false,
              });
            }}
          >
            <h1 className="ui header">
              Search in external database
              <div className="sub header">
                A keyword search looks for words anywhere in the record of the{" "}
                <a
                  href="https://www.materialsproject.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Materials Project
                </a>{" "}
                database.
                {noResults && (
                  <div className="ui negative tiny message">
                    <i
                      className="close icon"
                      onClick={() => this.setState({ noResults: false })}
                    />
                    <div className="content">
                      <div className="header">Invalid formula</div>
                      <p>
                        Search is <b>case sensitive</b>. The identifier can be a
                        Materials Project material id (e.g., <i>mp-123</i>), a
                        formula (e.g., <i>Fe2O3</i>), or a chemical system ("-"
                        separated list of elemments, e.g., <i>Li-Fe-O</i>).
                      </p>
                    </div>
                  </div>
                )}
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
                    searching: true,
                  });
                }}
              >
                Search
              </button>
            </div>
            <div />
          </form>
        </div>

        {searchResults.map((material, index) => (
          <SearchResult key={index} material={material} setMatrix={setMatrix} />
        ))}
      </div>
    );
  }
}
