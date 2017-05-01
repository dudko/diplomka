import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as api from '../api';
import { addToCompare } from '../actions';

import InputElasticity from './InputElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';

import CompositeRatio from '../components/CompositeRatio';
import CompositeRotation from '../components/CompositeRotation';
import CrystalSystemSelect from '../components/CrystalSystemSelect';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';
import Properties from '../components/Properties';
import Plot from '../components/Plot';
import PlotRatioVariations from '../components/PlotRatioVariations';

const createWorker = require('worker-loader!../worker');

class Composite extends Component {
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
      rotation: [0, 0, 1],
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined
      },
      processing: false,
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, rotation, ratio, colorScheme, colorbarRange, processing } = this.state;
    const { addToCompare } = this.props;

    return (
      <div>
        <div className='flex two'>
          <Plot
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
            title={'Young\'s modulus'}
            colorScheme={colorScheme}
            cmin={colorbarRange.min}
            cmax={colorbarRange.max}  
          />
          <Plot
            key={'compress'}
            points={results}
            redraw={redraw}
            propertyName={'compress'}
            title={'Linear compressibility'}
            colorScheme={colorScheme}            
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
            <div
              className='flex half'
            >
              <ColorScheme
                colorScheme={colorScheme}
                setColorScheme={(colorScheme) => this.setState({ colorScheme })}
              />
              <ColorbarRange
                setColorbarRange={(range) => this.setState({
                  colorbarRange: {...colorbarRange, ...range }})}
              />
            </div>
            <div>
              <button
                type='button'
                className='success'
                disabled={processing}
                onClick={() => {
                  this.setState({ processing: true });
                  const elasticityValues = elasticities.map(elasticity =>
                    elasticity.map(row => row.map(cell => cell.value)));
                  worker.postMessage({
                    elasticities: elasticityValues,
                    ratio,
                    rotation
                  });
                  worker.onmessage = msg => {
                    this.setState({ results: msg.data, redraw: true, processing: false });
                    api.sendToElate(msg.data.compositeElasticity,
                      (tables) => this.setState({ elateAnalysis: tables })
                  )};
                }}
              >
                {processing ? 'Processing...' : 'Process'}
              </button>
              
              <button
                type='button'
                className='warning'
                onClick={() => addToCompare(results)}
              >
                Add to Comparator
              </button>
            </div>
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

export default connect(null, { addToCompare })(Composite);