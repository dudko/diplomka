import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as api from '../api';
import { addToCompare } from '../actions';
import { DEFAULT_ELATE, DEFAULT_ELASTICITY } from '../constants/defaults';

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
      elasticities: [0, 1].map(() => DEFAULT_ELASTICITY),
      crystalSystems: ['any', 'any'],
      results: {
        x: [],
        y: [],
        z: [],
        youngs: [],
        compress: [],
        ratioVariations: {},
        compositeElasticity: [],
        rotatedTensors: [],
      },
      worker: new createWorker(),
      elateAnalysis: DEFAULT_ELATE,
      redraw: false,
      ratio: 0.5,
      rotation: [0, 0, 1],
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined
      },
      processing: false,
      advanceInput: false,
      error: '',
    }
  }

  /* Prevent plotly to update frequently */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.redraw) {
      this.setState({
        redraw: false
      });
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, rotation, ratio, colorScheme, colorbarRange, processing,
      advenceInput, error } = this.state;
    const { addToCompare } = this.props;

    return (
      <div>
        {/* visualization */}
        <div className='flex two'>
          <Plot
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
            title={'Young\'s modulus'}
            unit={'GPa'}
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

          <PlotRatioVariations
            results={results.ratioVariations}
          />

          <div>
            <div>
              {results.compositeElasticity.length > 0 && <h5>Calculated elasticty</h5>}
              <table
              style={{
                tableLayout:'fixed',
                width:'100%'
              }}
              >
                <tbody>
                  {results.compositeElasticity.map((row, index) =>
                    <tr key={index}>
                      {row.map((cell, index) =>
                      <td key={index}>{cell.toFixed(3)}</td>)}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div>
              {results.rotatedTensors.length > 0 && <h5>Rotated elasticities</h5>}
              {results.rotatedTensors.map(rotated =>
                <table
                style={{
                  tableLayout:'fixed',
                  width:'100%',
                  marginBottom: '15px',
                }}
                >
                  <tbody>
                    {rotated.map((row, index) =>
                      <tr key={index}>
                        {row.map((cell, index) =>
                        <td key={index}>{cell.toFixed(3)}</td>)}
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Properties calculated with elate */}
        <Properties
          tables={elateAnalysis}
        />

        {/* Main panel */}
        <div className='card'>
          <header>
            <div style={{
              float: 'right',
              fontSize: '1.1em'
            }}>
              <button
                type='button'
                className='warning'
                disabled={!results.youngs.length}
                onClick={() => addToCompare(results)}
              >
                ➕ Compare
              </button>
            
              <button
                type='button'
                className='success'
                disabled={processing}
                onClick={() => {
                  this.setState({
                    processing: true,
                    error: ''
                  });
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
                  worker.addEventListener('error', (e) => {
                    this.setState({
                      processing: false,
                      error: e.message
                    });
                  });
                }}
              >
                {processing ? '⚙️ Processing...' : ' ⚙️ Process'}
              </button>
            </div>

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

              <div
                className='flex two'
              >
                <CompositeRotation
                  updateRotation={(rotation) => this.setState({ rotation })}
                />
                <CompositeRatio
                  updateRatio={(value) => this.setState({ ratio: value})}
                />
              </div>
            </div>
          </header>
          {error &&
            <footer>
            {`⚠️ ${error.split(':').pop()}.`}
          </footer>}
        </div>
            
        {/* Main inputs */}
        <div className='flex two'>


          {['First', 'Second'].map((name, materialIndex) =>          
            <div key={materialIndex}>
              <h1>
                <span
                  className='label'
                  style={{
                    background: '#85144b'                  
                  }}
                  >
                    {`${name} material`}
                  </span>
              </h1>

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