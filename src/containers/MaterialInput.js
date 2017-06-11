import React, { Component } from "react";
import { connect } from "react-redux";

import { DEFAULT_ELASTICITY } from "../constants/defaults";
import { addToComposite, removeMatrix } from "../actions";
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
    const { materials, addToComposite, removeMatrix, toggleModal } = this.props;

    return (
      <div>

        <div className="flex two">
          <div>
            <div>
              <TextArea
                matrix={matrix}
                setElasticity={matrix => this.setState({ matrix })}
                toggleModal={toggleModal}
              />
            </div>

            <div>
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
            </div>

            <hr />
            <MaterialProjectSearch
              setMatrix={matrix =>
                this.setState({
                  matrix
                })}
              toggleModal={toggleModal}
            />
          </div>

          <div>
            <h3
              style={{
                textAlign: "center"
              }}
            >
              Composite elements
              {" "}
              <a
                className="handPointer fa fa-info-circle"
                onClick={() => toggleModal("stiffnessMatrix")}
              />
            </h3>
            {materials.map((material, key) =>
              <div className="card" key={key}>
                <header>
                  <h3><span className="label success">{`# ${key}`}</span></h3>
                  <label className="close" onClick={() => removeMatrix(key)}>
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
                      {material.get("matrix").map((row, index) =>
                        <tr key={`mat-${index}`}>
                          {row.map((cell, index) =>
                            <td key={index}>
                              {Number(cell) % 1
                                ? Number(cell).toFixed(3)
                                : Number(cell)}
                            </td>
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
  removeMatrix,
  toggleModal
})(MaterialInput);
