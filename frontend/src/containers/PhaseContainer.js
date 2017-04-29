import React, { Component } from 'react';

import { connect } from 'react-redux';
import { submitPhase, processPoints } from '../actions';

import ElasticityInput from './ElasticityInput';
import PropertiesContainer from './PropertiesContainer';

import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
import Chart from '../components/Chart';

class PhaseContainer extends Component {
  render() {
    const { elasticity, points, worker, submitPhase } = this.props;

    return (
      <div>
        <div className='flex two'>
          <Chart
            points={points}
          />
          <PropertiesContainer />
        </div>
        <div className='flex two'>
          <div>
            <ElasticityInput
              id={'1'}
            />

            <Button
              onClick={() =>
                submitPhase(elasticity.map(row => row.map(cell => cell.value)), worker)}
            >
              Submit
            </Button>
          </div>
          
          <MaterialProjectSearch
            elasticityId={'1'}
          />
        </div>

        
      </div>
    )
  }
} 

const mapStateToProps = (state, ownProps) => ({
  elasticity: state.elasticities['1'],
  points: state.points,
  worker: state.worker,
});

const mapDispatchToProps = {
  submitPhase,
  processPoints
}

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);
