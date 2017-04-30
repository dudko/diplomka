import React, { Component } from 'react';

import ElasticityInput from './ElasticityInput';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import CompositeRatio from '../components/CompositeRatio';
import CompositeRotation from '../components/CompositeRotation';
import CrystalSystemSelect from './CrystalSystemSelect';

import RangeRun from './RangeRun';

import Chart from '../components/Chart';
import Properties from '../components/Properties';

import _ from 'lodash';
const createWorker = require('worker-loader!../worker');

export default class CompositeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elasticities: [0, 1].map(() => [0, 1, 2, 3, 4, 5].map(row =>
        [0, 1, 2, 3, 4, 5].map(cell =>
          ({ value: 0, disabled: false })
      ))),
      crystalSystems: ['any', 'any'],
      results: {
        x: [],
        y: [],
        z: [],
        youngs: [],
        compress: []
      },
      worker: new createWorker(),
      elateAnalysis: [],
      redraw: false,
      ratio: 0.5,
      rotation: {
        x: 0,
        y: 0,
        z: 1,
      }
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, ratio, rotation } = this.state;

    return (
      <div>
        <div className='flex two'>
          <Chart
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
          />
          <Chart
            key={'compress'}
            points={results}
            redraw={redraw}
            propertyName={'compress'}
          />
        </div>
        <RangeRun />

        <Properties
          tables={elateAnalysis}
        />

        <button
          type='button'
          className='success'
          onClick={() => {
            const elasticityValues = elasticities.map(elasticity =>
              elasticity.map(row => row.map(cell => cell.value)));
            worker.postMessage(elasticityValues);
            worker.onmessage = msg => this.setState({ results: msg.data, redraw: true });
          }}
        >
          Submit
        </button>

        <hr />

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
            <h3>First material</h3>

            <CrystalSystemSelect
              crystalSystem={crystalSystems[0]}
              setSelectedCrystalSystem={(value) => this.setState({
                crystalSystem: value
              })}
            />

            <ElasticityInput
              elasticity={elasticities[0]}
              setConstant={(value, index) => {
                const nextElasticities = _.cloneDeep(elasticities);
                nextElasticities[0][index.row][index.cell].value = value; 
                this.setState({
                  elasticities: nextElasticities
                });
              }}
            />
          
            <MaterialProjectSearch
              setElasticity={(foundElasticity, foundCrystalSystem) => {
                const nextElasticities = _.cloneDeep(elasticities);
                nextElasticities[0] = nextElasticities[0].map((row, rowIndex) =>
                  row.map((cell, cellIndex) =>
                    ({...cell, value: foundElasticity[rowIndex][cellIndex]})
                ));
                const nextCrystalSystems = _.cloneDeep(crystalSystems)
                this.setState({
                  elasticities: nextElasticities,
                  crystalSystems: nextCrystalSystems
                })
              }}
          />

          </div>

          <div>
            <h3>Second material</h3>

            <CrystalSystemSelect
              crystalSystem={crystalSystems[1]}
              setSelectedCrystalSystem={(value) => this.setState({
                crystalSystem: value
              })}
            />

            <ElasticityInput
              elasticity={elasticities[1]}
              setConstant={(value, index) => {
                const nextElasticities = _.cloneDeep(elasticities);
                nextElasticities[1][index.row][index.cell].value = value; 
                this.setState({
                  elasticities: nextElasticities
                });
              }}
            />
          
            <MaterialProjectSearch
              setElasticity={(foundElasticity, foundCrystalSystem) => {
                const nextElasticities = _.cloneDeep(elasticities);
                nextElasticities[1] = nextElasticities[1].map((row, rowIndex) =>
                  row.map((cell, cellIndex) =>
                    ({...cell, value: foundElasticity[rowIndex][cellIndex]})
                ));
                const nextCrystalSystems = _.cloneDeep(crystalSystems)
                this.setState({
                  elasticities: nextElasticities,
                  crystalSystems: nextCrystalSystems
                })
              }}
            />

          </div>          

        </div>
      </div>
    )
  }
}