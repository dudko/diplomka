import React, { Component } from 'react';
import _ from 'lodash';
import * as api from '../api';

import InputElasticity from './InputElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';

import CompositeRatio from '../components/CompositeRatio';
import CompositeRotation from '../components/CompositeRotation';
import CrystalSystemSelect from '../components/CrystalSystemSelect';
import Properties from '../components/Properties';

import Plot from '../components/Plot';
import PlotRatioVariations from '../components/PlotRatioVariations';

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
        compress: [],
        ratioVariations: {},
        compositeElasticity: []
      },
      worker: new createWorker(),
      elateAnalysis: [],
      redraw: false,
      ratio: 0.5,
      
      rotation: [0, 0, 1]
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, rotation, ratio, ratioVariations } = this.state;

    return (
      <div>
        <div className='flex two'>
          <Plot
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
            title={'Young\'s modulus'}
          />
          <Plot
            key={'compress'}
            points={results}
            redraw={redraw}
            propertyName={'compress'}
            title={'Linear compressibility'}
          />
        </div>
        <div className='flex two'>
          <PlotRatioVariations
            results={results.ratioVariations}
          />

          <Properties
            tables={elateAnalysis}
          />
        </div>
        <div
          className='card'
        >
          <header>
            <button
              type='button'
              className='success'
              onClick={() => {
                const elasticityValues = elasticities.map(elasticity =>
                  elasticity.map(row => row.map(cell => cell.value)));
                worker.postMessage({
                  elasticities: elasticityValues,
                  ratio,
                  rotation
                });
                worker.onmessage = msg => {
                  this.setState({ results: msg.data, redraw: true });
                  api.sendToElate(msg.data.compositeElasticity,
                    (tables) => this.setState({ elateAnalysis: tables })
                )};
              }}
            >
              Submit
            </button>
          </header>
        </div>

        <div className='flex two'>
          <CompositeRotation
            updateRotation={(rotation) => this.setState({ rotation })}
          />
          <CompositeRatio
            updateRatio={(value) => this.setState({ ratio: value})}
          />
        </div>

        <div className='flex two'>
          {['First', 'Second'].map((name, materialIndex) =>          
            <div
              key={materialIndex}
            >
              <h3>{`${name} material`}</h3>

              <CrystalSystemSelect
                crystalSystem={crystalSystems[materialIndex]}
                setSelectedCrystalSystem={(value) => {
                  const nextCrystalSystems = [...crystalSystems];
                  nextCrystalSystems[materialIndex] = value;
                  this.setState({
                    crystalSystems: nextCrystalSystems
                  });
                }}
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
                  const nextCrystalSystems = _.cloneDeep(crystalSystems);
                  nextCrystalSystems[materialIndex] = foundCrystalSystem;
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