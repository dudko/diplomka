import React, { Component } from "react";
import { connect } from "react-redux";
import { removeAdded, setRotation } from "../actions";

import CompositeRotation from "../components/CompositeRotation";

// eslint-disable-next-line
const CreateWorker = require("worker-loader!../worker");

class Adjust extends Component {
  render() {
    const { materials, removeAdded, setRotation } = this.props;

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
                <button
                  className="label error"
                  onClick={() => removeAdded(key)}
                >
                  <i className="fa fa-remove" />
                </button>
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
                        {row.map((cell, index) => <td key={index}>{cell}</td>)}
                      </tr>
                    )}
                  </tbody>
                </table>

              </footer>
            </div>
            <CompositeRotation
              rotation={material.rotation}
              setRotation={rotation => setRotation(key, rotation)}
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

export default connect(mapStateToProps, { removeAdded, setRotation })(Adjust);
