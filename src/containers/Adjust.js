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
          ? <div>
              <h3>
                Adjust rotations and set fractions{" "}
                <a
                  className="handPointer fa fa-info-circle"
                  onClick={() => toggleModal("stiffnessMatrix")}
                />
              </h3>
              {materials.map((material, key) =>
                <div className="flex two" key={key}>
                  <div className="card">
                    <header>
                      <h3>
                        <span className="label success">{`# ${key}`}</span>
                      </h3>
                      <label
                        className="close"
                        onClick={() => removeMatrix(key)}
                      >
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
                    </footer>
                  </div>

                  <div>
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
