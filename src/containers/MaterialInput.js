import React, { Component } from "react";
import { connect } from "react-redux";

import { DEFAULT_ELASTICITY } from "../constants/defaults";
import { addToComposite, removeMatrix } from "../actions";

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
    const { materials, addToComposite, removeMatrix } = this.props;

    return (
      <div className="ui centered grid">
        <div className="six wide column">
          <div className="ui form">
            <TextArea
              matrix={matrix}
              setElasticity={matrix => this.setState({ matrix })}
            />
            <br />
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
          />
        </div>

        <div className="one wide column" />
        <div className="center aligned six wide column">
          {materials.map((material, key) =>
            <table className="ui table">
              <thead>
                <th colSpan="6">
                  <button
                    className="ui mini red icon button"
                    onClick={() => removeMatrix(key)}
                  >
                    <i className="close icon" />
                  </button>
                </th>
              </thead>
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
  removeMatrix
})(MaterialInput);
