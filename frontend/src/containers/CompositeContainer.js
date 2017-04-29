import React, { Component } from 'react';

import { connect } from 'react-redux';
import { submitComposite, processPoints } from '../actions';

import ElasticityInput from './ElasticityInput';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
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
    const { materialOne, materialTwo, points, worker, submitComposite } = this.props;
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
          <div>
            <h5>Orientation of components</h5>
            <input type="text" value={rotation.x} onChange={(e) => this.setState({ rotation: {...rotation, x: e.target.value }})} />
            <input type="text" value={rotation.y} onChange={(e) => this.setState({ rotation: {...rotation, y: e.target.value }})} />
            <input type="text" value={rotation.z} onChange={(e) => this.setState({ rotation: {...rotation, z: e.target.value }})} />
            <p></p>
          </div>
          <div>
            <h5>Composite ratio</h5>
            <input value={ratio} onChange={(e) => this.setState({ ratio: e.target.value })} />
            <input value={1.0-ratio} disabled={true} />
            <p></p>
          </div>
        </div>  
        
        <div className='flex two'>
          <div>
            <ElasticityInput
              id={'1'}
            />
          </div>
          
          <MaterialProjectSearch
            elasticityId={'1'}
          />
        </div>

        <div className='flex two'>
          <div>
            <ElasticityInput
              id={'2'}
            />
            <Button
              onClick={() =>
                submitComposite({
                  '1': materialOne.map(row => row.map(cell => cell.value)),
                  '2': materialTwo.map(row => row.map(cell => cell.value)),
                  ratio,
                  direction: rotation,
              }, worker)}
            >
              Submit
            </Button>
          </div>
          <MaterialProjectSearch
            elasticityId={'2'}
          />
        </div>


      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  materialOne: state.inputForTensors['1'],
  materialTwo: state.inputForTensors['2'],
  points: state.points,
  worker: state.reducer.worker,
});

const mapDispatchToProps = {
  submitComposite,
  processPoints
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositeContainer);
