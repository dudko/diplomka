import React, { Component } from "react";
import { connect } from "react-redux";
import { removeMatrix, resetMatrix, setFraction } from "../actions";
import { toggleModal } from "../actions/modalActions";
import { rotateMatrix, rotateByAngle } from "../actions/workerActions";

import CompositeRotation from "../components/CompositeRotation";
import AngleRotation from "../components/AngleRotation";
import Fraction from "../components/Fraction";

class Adjust extends Component {
  render() {
    const {
      materials,
      removeMatrix,
      rotateMatrix,
      rotateByAngle,
      resetMatrix,
      setFraction,
      toggleModal
    } = this.props;
    return (
      <div>
        {materials.size
          ? <div className="ui centered grid">
              <h1 className="ui header">
                Adjust rotations and set fractions
                <div className="sub header">
                  Rotate internal axes or rotate by angle
                </div>
              </h1>
              {materials.map((material, key) =>
                <div className="row">
                  <div className="six wide column" key={key}>
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
                          <tr key={index}>
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
                  </div>

                  <div className="one wide column" />

                  <div className="six wide column">
                    <CompositeRotation
                      rotated={material.get("rotated")}
                      rotation={material.get("rotation")}
                      matrix={material.get("matrix")}
                      rotateMatrix={rotation =>
                        rotateMatrix(key, material.get("matrix"), rotation)}
                      resetMatrix={() => resetMatrix(key)}
                    />
                    <AngleRotation
                      rotated={material.get("rotated")}
                      angle={material.get("angle")}
                      rotateByAngle={angle =>
                        rotateByAngle(key, material.get("matrix"), angle)}
                      resetMatrix={() => resetMatrix(key)}
                    />
                    <Fraction
                      fraction={material.get("fraction")}
                      setFraction={fraction => setFraction(key, fraction)}
                    />
                  </div>
                </div>
              )}
            </div>
          : <h3
              style={{
                textAlign: "center"
              }}
            >
              Nothing to adjust. Add materials first.
            </h3>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  materials: state.materials
});

export default connect(mapStateToProps, {
  toggleModal,
  removeMatrix,
  rotateMatrix,
  rotateByAngle,
  resetMatrix,
  setFraction
})(Adjust);
