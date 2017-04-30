import React, { Component } from 'react';

import { connect } from 'react-redux';

import InputElasticity from './InputElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';
import Properties from '../components/Properties';

import Plot from '../components/Plot';
import CrystalSystemSelect from '../components/CrystalSystemSelect';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';


import _ from 'lodash';
import * as api from '../api';
import { addToCompare } from '../actions';

const createWorker = require('worker-loader!../worker');

class SingleMaterial extends Component {
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
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined
      }
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
      redraw, colorScheme, colorbarRange } = this.state;
    const { addToCompare } = this.props;


    return (
      <div>
        <div className='flex two'>
          <Plot
            key={'youngs'}
            points={results}
            redraw={redraw}
            propertyName={'youngs'}
            colorScheme={colorScheme}
            cmin={colorbarRange.min}
            cmax={colorbarRange.max}            
          />
          <Plot
            key={'compress'}
            points={results}
            redraw={redraw}
            propertyName={'compress'}
            colorScheme={colorScheme}
          />
        </div>

        <Properties
          tables={elateAnalysis}
        />

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

            <button
              type='button'
              className='success'
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

            <button
              type='button'
              className='warning'
              onClick={() => addToCompare(results)}
            >
              Add to Comparator
            </button>

          </header>
        </div>

        
  
        <div className='flex two'>
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