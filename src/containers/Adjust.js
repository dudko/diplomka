import React, { Component } from "react";
import { connect } from "react-redux";
import { removeAdded, setRotation, setMatrix } from "../actions";
import { rotateMatrix } from "../actions/workerActions";

import CompositeRotation from "../components/CompositeRotation";

// eslint-disable-next-line
const CreateWorker = require("worker-loader!../worker");

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: new CreateWorker(),
      materials: props.materials
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      materials: nextProps.materials
    });
  }

  render() {
    const { worker, materials } = this.state;
    const { removeAdded, setRotation, setMatrix } = this.props;

    worker.onmessage = ({ data }) => {
      const { key, matrix } = data;
      setMatrix(key, matrix);
    };

    return (
      <div>
        {materials.map((material, key) =>
          <div className="flex two" key={key}>
            <div className="card">
              <header
                style={{
                  textAlign: "right"
                }}
              >
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
                      <tr key={index}>
                        {row.map((cell, index) =>
                          <td key={index}>{cell.toFixed(2)}</td>
                        )}
                      </tr>
                    )}
                  </tbody>
                </table>

              </footer>
            </div>
            <CompositeRotation
              rotation={material.rotation}
              setRotation={rotation => setRotation(key, rotation)}
              rotateMatrix={rotation =>
                worker.postMessage({
                  key,
                  matrix: material.matrix,
                  rotation
                })}
            />
          </div>
        )}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  materials: state.materials
});

export default connect(mapStateToProps, {
  removeAdded,
  setRotation,
  setMatrix,
  rotateMatrix
})(Adjust);
