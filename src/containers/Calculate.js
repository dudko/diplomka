import React, { Component } from "react";
import { connect } from "react-redux";
import Plot from "../components/Plot";

import { calculate } from "../actions/workerActions";

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.results,
      processing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      results: nextProps.results
    };
  }

  render() {
    const { materials, calculate } = this.props;
    const { processing, results } = this.state;

    return (
      <div>
        <button
          type="button"
          className="success"
          disabled={processing}
          onClick={() => {
            const materialsRaw = materials.reduce((result, material) => {
              result.push({
                matrix: material.get("matrix"),
                fraction: material.get("fraction")
              });
              return result;
            }, []);
            calculate(materialsRaw);
          }}
        >
          {processing ? "⚙️ Processing..." : " ⚙️ Process"}
        </button>

        {results &&
          <div>
            <Plot
              key={"youngs"}
              points={results}
              redraw={true}
              propertyName={"youngs"}
              title={"Young's modulus"}
              unit={"GPa"}
            />
            <Plot
              key={"compress"}
              points={results}
              redraw={true}
              propertyName={"compress"}
              title={"Linear compressibility"}
            />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
  results: state.results
});

export default connect(mapStateToProps, { calculate })(Calculate);
