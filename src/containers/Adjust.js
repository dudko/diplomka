import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { removeMatrix, resetMatrix, setFraction } from "../actions";
import { toggleModal } from "../actions/modalActions";
import { rotateMatrix } from "../actions/workerActions";
import { isValidFractionSum } from "../helpers";
import Rotations from "../components/Rotations";
import Fraction from "../components/Fraction";

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFraction: false
    };
  }

  componentDidMount() {
    const { materials } = this.props;

    if (!isValidFractionSum(materials)) {
      this.setState({
        invalidFraction: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { materials, results } = nextProps;
    this.state = {
      results: results
    };

    if (!isValidFractionSum(materials)) {
      this.setState({
        invalidFraction: true
      });
    }
  }
  render() {
    const {
      materials,
      removeMatrix,
      rotateMatrix,
      resetMatrix,
      setFraction,
      push
    } = this.props;

    const { invalidFraction } = this.state;
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
                    <Rotations
                      axes={material.get("axes")}
                      angle={material.get("angle")}
                      matrix={material.get("matrix")}
                      rotateMatrix={(axes, angle) =>
                        rotateMatrix(key, material.get("matrix"), axes, angle)}
                      resetMatrix={() => resetMatrix(key)}
                    />

                    <br />
                    <br />

                    <Fraction
                      fraction={material.get("fraction")}
                      setFraction={fraction => setFraction(key, fraction)}
                      invalidFraction={invalidFraction}
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
              <br />
              <div
                className="ui green inverted button"
                onClick={() => push("/input")}
              >
                <i className="edit icon" /> Input
              </div>
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
  resetMatrix,
  setFraction,
  push
})(Adjust);
