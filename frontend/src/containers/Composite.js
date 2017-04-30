import React, { Component } from 'react';
import _ from 'lodash';

import InputElasticity from './InputElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';

import CompositeRatio from '../components/CompositeRatio';
import CompositeRotation from '../components/CompositeRotation';
import CrystalSystemSelect from '../components/CrystalSystemSelect';
import Properties from '../components/Properties';

import Plot from '../components/Plot';
import RangeRun from './RangeRun';

const createWorker = require('worker-loader!../worker');

export default class Composite extends Component {
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
      ratioVariations: {},
      rotation: {
        x: 0,
        y: 0,
        z: 1,
      }
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, rotation, ratioVariations } = this.state;

    return (
      <div>
        <div className='flex two'>
          <Plot
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
          />
          <Plot
            key={'compress'}
            points={results}
            redraw={redraw}
            propertyName={'compress'}
          />
        </div>
        <RangeRun
          results={ratioVariations}
        />

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
          {['First', 'Second'].map((name, materialIndex) =>          
            <div>
              <h3>{`${name} material`}</h3>

              <CrystalSystemSelect
                crystalSystem={crystalSystems[materialIndex]}
                setSelectedCrystalSystem={(value) => this.setState({
                  crystalSystem: value
                })}
              />

              <InputElasticity
                elasticity={elasticities[materialIndex]}
                setConstant={(value, index) => {
                  const nextElasticities = _.cloneDeep(elasticities);
                  nextElasticities[materialIndex][index.row][index.cell].value = value; 
                  this.setState({
                    elasticities: nextElasticities
                  });
                }}
              />
            
              <MaterialProjectSearch
                setElasticity={(foundElasticity, foundCrystalSystem) => {
                  const nextElasticities = _.cloneDeep(elasticities);
                  nextElasticities[materialIndex] = nextElasticities[materialIndex].map((row, rowIndex) =>
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
          )}

        </div>
      </div>
    )
  }
}