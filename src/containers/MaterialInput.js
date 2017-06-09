import React, { Component } from "react";
import { connect } from "react-redux";

import { DEFAULT_ELASTICITY } from "../constants/defaults";
import { addToComposite, removeAdded } from "../actions";
import { toggleModal } from "../actions/modalActions";

import TextArea from "./TextArea";
import MaterialProjectSearch from "./MaterialProjectSearch";

// eslint-disable-next-line
const CreateWorker = require("worker-loader!../worker");

class MaterialInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: DEFAULT_ELASTICITY
    };
  }

  render() {
    const { matrix } = this.state;
    const { materials, addToComposite, removeAdded, toggleModal } = this.props;

    return (
      <div>
        <div className="half">
          <button
            onClick={() => {
              addToComposite(matrix);
            }}
          >
            <i className="fa fa-plus" /> Add
          </button>
          <button
            onClick={() => {
              this.setState({
                matrix: DEFAULT_ELASTICITY
              });
            }}
          >
            <i className="fa fa-eraser" /> Clear
          </button>

          {/*<label
            style={{
              float: "right"
            }}
          >
            <input type="checkbox" onChange={() => {}} />
            <span className="checkable">Advanced input</span>
          </label>*/}
        </div>

        <div className="flex two">
          <div>
            <div>
              <TextArea
                matrix={matrix}
                setElasticity={matrix => this.setState({ matrix })}
                toggleModal={toggleModal}
              />
            </div>

            <MaterialProjectSearch
              setMatrix={matrix =>
                this.setState({
                  matrix
                })}
            />
          </div>

          <div>
            <h4>Composite elements:</h4>
            {materials.map((material, key) =>
              <div className="card" key={key}>
                <header>
                  <h3 />
                  <label className="close" onClick={() => removeAdded(key)}>
                    &times;
                  </label>
                </header>

                <footer>
                  <table
                    style={{
                      tableLayout: "fixed",
                      width: "100%"
                    }}
                  >
                    <tbody>
                      {material.matrix.map((row, index) =>
                        <tr key={`mat-${index}`}>
                          {row.map((cell, index) =>
                            <td key={index}>{cell}</td>
                          )}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </footer>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  materials: state.materials
});

export default connect(mapStateToProps, {
  addToComposite,
  removeAdded,
  toggleModal
})(MaterialInput);
