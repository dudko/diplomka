import React, { Component } from 'react';

import ElasticityInput from './ElasticityInput';
import PropertiesContainer from './PropertiesContainer';
import MaterialProjectSearch from '../components/MaterialProjectSearch';
import Button from '../components/Button';
import Properties from '../components/Properties';

import Chart from '../components/Chart';
import CrystalSystemSelect from './CrystalSystemSelect';

import _ from 'lodash';
import * as api from '../api';

const createWorker = require('worker-loader!../worker');

export default class SingleMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elasticity: [0, 1, 2, 3, 4, 5].map(row =>
        [0, 1, 2, 3, 4, 5].map(cell =>
          ({ value: 0, disabled: false })
      )),
      crystalSystem: 'any',
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
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.redraw) {
      this.setState({
        redraw: false
      });
    }
  }

  render() {
    const { elasticity, crystalSystem, results, worker, elateAnalysis, redraw } = this.state;

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

        <Properties
          tables={elateAnalysis}
        />

        <hr />
        <button
          type='button'
          onClick={() => {
            const elasticityValues = elasticity.map(row => row.map(cell => cell.value));
            worker.postMessage(elasticityValues);
            worker.onmessage = msg => this.setState({ results: msg.data, redraw: true });
            api.sendToElate(elasticityValues, (tables) =>
              this.setState({ elateAnalysis: tables }))
          }}
        >
          Submit
        </button>
        <hr />

        <div className='flex two'>
          <div>
            <CrystalSystemSelect
              crystalSystem={crystalSystem}
              setSelectedCrystalSystem={(value) => this.setState({
                crystalSystem: value
              })}
            />

            <ElasticityInput
              elasticity={elasticity}
              setConstant={(value, index) => {
                const nextElasticity = _.cloneDeep(elasticity);
                nextElasticity[index.row][index.cell].value = value; 
                this.setState({
                  elasticity: nextElasticity
                });
              }}
            />
          </div>
          
          <MaterialProjectSearch
            setElasticity={(foundElasticity, foundCrystalSystem) => {
              this.setState({
                elasticity: elasticity.map((row, rowIndex) =>
                  row.map((cell, cellIndex) =>
                    ({...cell, value: foundElasticity[rowIndex][cellIndex]})
                )),
                crystalSystem: foundCrystalSystem
              })
            }}
          />
        </div>

        
      </div>
    )
  }
}