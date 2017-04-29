import React, { Component } from 'react';

import { connect } from 'react-redux';
import { submitComposite, processPoints } from '../actions';

import ElasticityInput from './ElasticityInput';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
import CompositeRatio from '../components/CompositeRatio';
import CompositeRotation from '../components/CompositeRotation';


import RangeRun from './RangeRun';

import Chart from '../components/Chart';
import PropertiesContainer from './PropertiesContainer';

class CompositeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: 0.5,
      rotation: {
        x: 0,
        y: 0,
        z: 1,
      }
    }
  }

  render() {
    const { elasticities, points, worker, submitComposite } = this.props;
    const { ratio, rotation } = this.state;

    return (
      <div>
        <div className='flex two'>
          <Chart
            points={points}
          />
          <PropertiesContainer />
        </div>
        <RangeRun />

        <div className='flex two'>
          <CompositeRotation
            updateRotation={(axis) => this.setState({
              ...rotation,
              ...axis
            })}
          />
          <CompositeRatio
            updateRatio={(value) => this.setState({ ratio: value})}
          />
          
        </div>  
        
        <div className='flex two'>
          <div>
            <ElasticityInput
              id={'2'}
            />
          </div>
          
          <MaterialProjectSearch
            elasticityId={'2'}
          />
        </div>

        <div className='flex two'>
          <div>
            <ElasticityInput
              id={'3'}
            />
            <Button
              onClick={() =>
                submitComposite({
                  elasticities: [
                    elasticities['2'].map(row => row.map(cell => cell.value)),
                    elasticities['3'].map(row => row.map(cell => cell.value))
                  ],
                  ratio,
                  rotation,
              }, worker)}
            >
              Submit
            </Button>
          </div>
          <MaterialProjectSearch
            elasticityId={'3'}
          />
        </div>


      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  elasticities: state.elasticities,
  points: state.points,
  worker: state.worker,
});

const mapDispatchToProps = {
  submitComposite,
  processPoints
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositeContainer);
