import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Plot from "../components/Plot";
import { Header, Modal } from "semantic-ui-react";
import { isValidFractionSum } from "../helpers";

import { calculate } from "../actions/workerActions";

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.results,
      processing: false,
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
    const { materials, calculate, push } = this.props;
    const { processing, results, invalidFraction } = this.state;

    return (
      <div>
        <Modal open={invalidFraction} basic size="small">
          <Header icon="warning circle" content="Fraction sum must be 1" />
          <Modal.Content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
              iure quos cupiditate, amet maxime similique hic quasi beatae
              possimus aperiam illum enim quisquam numquam quibusdam neque!
              Quidem reiciendis error porro!
            </p>
          </Modal.Content>
          <Modal.Actions>
            <div
              className="ui green inverted button"
              onClick={() => push("/adjust")}
            >
              <i className="settings icon" /> Adjust
            </div>
          </Modal.Actions>
        </Modal>
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

export default connect(mapStateToProps, { calculate, push })(Calculate);
