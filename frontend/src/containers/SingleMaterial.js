import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as api from '../api';
import { addToCompare } from '../actions';
import { DEFAULT_ELATE, DEFAULT_ELASTICITY } from '../constants/defaults';

import InputElasticity from './InputElasticity';
import TextAreaElasticity from './TextAreaElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';
import Properties from '../components/Properties';

import Plot from '../components/Plot';
import CrystalSystemSelect from '../components/CrystalSystemSelect';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';

const createWorker = require('worker-loader!../worker');

class SingleMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elasticity:  DEFAULT_ELASTICITY,
      crystalSystem: 'any',
      results: {
        x: [],
        y: [],
        z: [],
        youngs: [],
        compress: []
      },
      worker: new createWorker(),
      elateAnalysis: DEFAULT_ELATE,
      redraw: false,
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined
      },
      processing: false,
      advanceInput: false,
      error: '',
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
    const { elasticity, crystalSystem, results, worker, elateAnalysis, 
      redraw, colorScheme, colorbarRange, processing, advanceInput, error } = this.state;
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
                    error: '' });
                  const elasticityValues = elasticity.map(row => row.map(cell => cell.value));
                  worker.postMessage(elasticityValues);
                  worker.onmessage = msg => this.setState({ results: msg.data, redraw: true,
                    processing: false });
                  worker.addEventListener('error', (e) => {
                    console.log(e);
                    this.setState({
                      processing: false,
                      error: e.message
                    });
                  });
                  api.sendToElate(elasticityValues, (tables) =>
                    this.setState({ elateAnalysis: tables.length > 0 ? tables : DEFAULT_ELATE }))
                }}
              >
                {processing ? '⚙️ Processing...' : ' ⚙️ Process'}
              </button>

            </div>

            <div className='flex half'>
              <ColorScheme
                colorScheme={colorScheme}
                setColorScheme={(colorScheme) => this.setState({ colorScheme })}
              />
              <ColorbarRange
                setColorbarRange={(range) => this.setState({
                  colorbarRange: {...colorbarRange, ...range }})}
              />
            </div>

          </header>
          {error &&
            <footer>
            {`⚠️ ${error.split(':').pop()}.`}
          </footer>}
        </div>
  
        <div className='flex two'>
          <div>
            <label
              style={{
                float: 'right'
              }}
            >
              <input
                type='checkbox'
                checked={advanceInput}
                onChange={() => this.setState({ advanceInput : !advanceInput })}
              />
              <span className="checkable">Advance input</span>
            </label>

            {advanceInput ?         
              <div>
                <TextAreaElasticity
                  elasticity={elasticity}
                  setElasticity={elasticity => this.setState({
                    elasticity: elasticity.map(row => row.map(value =>
                    ({ value, disabled: false })))
                    })}
                />
              </div>
            :
              <div>
                <CrystalSystemSelect
                  crystalSystem={crystalSystem}
                  setSelectedCrystalSystem={(value) => this.setState({
                    crystalSystem: value
                  })}
                />

                <InputElasticity
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
            }
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

export default connect(null, { addToCompare })(SingleMaterial);