import React, { Component } from 'react';

import { connect } from 'react-redux';
import { submitComposite, processPoints } from '../actions';

import MatrixContainer from './MatrixContainer';
import CrystalSystemSelect from './CrystalSystemSelect';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
import CompositeRotation from '../components/CompositeRotation';
import RangeRun from './RangeRun';

import Chart from '../components/Chart';
import PropertiesContainer from './PropertiesContainer';

class CompositeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0.5,
    }
  }

  render() {
    const { materialOne, materialTwo, crystalSystem, points, worker, submitComposite } = this.props;
    const { ratio } = this.state;

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

        <RangeRun />

        <CompositeRotation />
        <div>
          <h5>Composite ratio</h5>
          <input value={ratio} onChange={(e) => this.setState({ ratio: e.target.value })} />
          <input value={1-ratio} disabled={true} />
          <p></p>
        </div>
        
        <div
          style={{display: 'flex'}}
        >
          <CrystalSystemSelect />
          <MatrixContainer
            id={'1'}
            rowCount={6}
            columnCount={6}
          />
          <MaterialProjectSearch
            tensorsId={'1'}            
          />
        </div>

        <hr/>
        <div
          style={{display: 'flex'}}
        >
          <CrystalSystemSelect />
          <MatrixContainer
            id={'2'}          
            rowCount={6}
            columnCount={6}
          />
          <MaterialProjectSearch
            tensorsId={'2'}
          />
        </div>

        <Button
          onClick={() =>
            submitComposite({
              '1': materialOne.map(row => row.map(cell => cell.value)),
              '2': materialTwo.map(row => row.map(cell => cell.value)),
              ratio,
          }, worker)}
        >
          Submit
        </Button>
      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  materialOne: state.inputForTensors['1'],
  materialTwo: state.inputForTensors['2'],
  crystalSystem: state.reducer.crystalSystem,
  points: state.points,
  worker: state.reducer.worker,
});

const mapDispatchToProps = {
  submitComposite,
  processPoints
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositeContainer);
