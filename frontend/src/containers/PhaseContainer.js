import React, { Component } from 'react';

import { connect } from 'react-redux';
import { submitPhase, processPoints } from '../actions';

import Matrix from './MatrixContainer';
import CrystalSystemSelect from './CrystalSystemSelect';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
import Chart from '../components/Chart';
import PropertiesContainer from './PropertiesContainer';

class PhaseContainer extends Component {
  render() {
    const { elasticity, crystalSystem, points, worker, submitPhase } = this.props;

    return (
      <div>
        <div
          style={{display: 'flex'}}
        >
          <Chart
            points={points}
          />
          <PropertiesContainer />
        </div>

        <div
          style={{display: 'flex'}}
        >
          {/*<CrystalSystemSelect />*/}
          <Matrix
            id={'1'}
            rowCount={6}
            columnCount={6}
          />
          <MaterialProjectSearch
            tensorsId={'1'}
          />
        </div>

        <Button
          onClick={() =>
            submitPhase(elasticity.map(row => row.map(cell => cell.value)), worker)}
        >
          Submit
        </Button>
      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  elasticity: state.reducer.elasticity,
  crystalSystem: state.reducer.crystalSystem,
  points: state.points,
  worker: state.reducer.worker,
});

const mapDispatchToProps = {
  submitPhase,
  processPoints
}

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);
