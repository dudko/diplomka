import React, { Component } from "react";
import { connect } from "react-redux";

import { DEFAULT_ELASTICITY } from "../constants/defaults";
import { addToComposite, removeMatrix } from "../actions";
import { toggleModal } from "../actions/modalActions";

import TextArea from "./TextArea";
import MaterialProjectSearch from "./MaterialProjectSearch";
import Steps from "../components/Steps";

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
      <div className="ui grid">
        <Steps />
        <div className="eight wide column">
                  <div className="ui form">

          <TextArea
            matrix={matrix}
            setElasticity={matrix => this.setState({ matrix })}
            toggleModal={toggleModal}
          />

            <button
              className="ui blue button"
              onClick={() => {
                addToComposite(matrix);
              }}
            >
              <i className="plus icon" /> Add
            </button>
            <button
              className="ui blue button"
              onClick={() => {
                this.setState({
                  matrix: DEFAULT_ELASTICITY
                });
              }}
            >
              <i className="eraser icon" /> Clear
            </button>
          </div>

          <div className="ui horizontal divider">Or</div>

          <MaterialProjectSearch
            setMatrix={matrix =>
              this.setState({
                matrix
              })}
            toggleModal={toggleModal}
          />
        </div>

        <div className="center aligned eight wide column">
          <h3>
            Composite elements{" "}
            <a
              className="handPointer fa fa-info-circle"
              onClick={() => toggleModal("stiffnessMatrix")}
            />
          </h3>
          {materials.map((material, key) =>
            <div className="card" key={key}>
              <header>
                <h3>
                  <span className="label success">{`# ${key}`}</span>
                </h3>
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
