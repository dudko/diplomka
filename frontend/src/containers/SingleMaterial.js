import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as api from '../api';
import { addToCompare } from '../actions';
import { DEFAULT_ELATE, DEFAULT_ELASTICITY } from '../constants/defaults';

import InputElasticity from './InputElasticity';
import TextAreaElasticity from './TextAreaElasticity';
import MaterialProjectSearch from './MaterialProjectSearch';
import Properties from '../components/Properties';

import Plot from '../components/Plot';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';

const CreateWorker = require('worker-loader!../worker');

class SingleMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elasticity: DEFAULT_ELASTICITY,
      crystalSystem: 'any',
      results: {
        x: [],
        y: [],
        z: [],
        youngs: [],
        compress: [],
      },
      worker: new CreateWorker(),
      elateAnalysis: DEFAULT_ELATE,
      redraw: false,
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined,
      },
      processing: false,
      advanceInput: false,
      error: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.redraw) {
      this.setState({
        redraw: false,
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
        <div className="flex two">
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
        <div className="card">
          <header>
            <div
              style={{
                float: 'right',
                fontSize: '1.1em',
              }}
            >
              <button
                type="button"
                className="warning"
                disabled={!results.youngs.length}
                onClick={() => addToCompare(results)}
              >
                ➕ Compare
              </button>

              <button
                type="button"
                className="success"
                disabled={processing}
                onClick={() => {
                  this.setState({
                    processing: true,
                    error: '' });
                  worker.postMessage(elasticity);
                  worker.onmessage = msg => this.setState({
                    results: msg.data,
                    redraw: true,
                    processing: false,
                  });
                  worker.addEventListener('error', (e) => {
                    this.setState({
                      processing: false,
                      error: e.message,
                    });
                  });
                  api.sendToElate(elasticity, tables =>
                    this.setState({ elateAnalysis: tables.length > 0 ? tables : DEFAULT_ELATE }));
                }}
              >
                {processing ? '⚙️ Processing...' : ' ⚙️ Process'}
              </button>

            </div>

            <div className="flex half">
              <ColorScheme
                colorScheme={colorScheme}
                setColorScheme={colorScheme => this.setState({ colorScheme })}
              />
              <ColorbarRange
                setColorbarRange={range => this.setState({
                  colorbarRange: { ...colorbarRange, ...range } })}
              />
            </div>

          </header>
          {error &&
            <footer>
              {`⚠️ ${error.replace(/^(.+?):/, '')}.`}
            </footer>}
        </div>

        <div className="flex two">
          <div>
            <label
              style={{
                float: 'right',
              }}
            >
              <input
                type="checkbox"
                checked={advanceInput}
                onChange={() => {
                  this.setState({
                    advanceInput: !advanceInput,
                    crystalSystem: 'any',
                  });
                }}
              />
              <span className="checkable">Advance input</span>
            </label>

            {advanceInput ?
              <div>
                <TextAreaElasticity
                  elasticity={elasticity}
                  setElasticity={elasticity => this.setState({ elasticity })}
                />
              </div>
            :
              <div>
                <InputElasticity
                  elasticity={elasticity}
                  crystalSystem={crystalSystem}
                  setElasticity={elasticity => this.setState({ elasticity })}
                  setCrystalSystem={crystalSystem => this.setState({ crystalSystem })}
                />
              </div>
            }
          </div>

          <MaterialProjectSearch
            setElasticity={(elasticity, crystalSystem) => this.setState({
              elasticity,
              crystalSystem,
            })}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCompare })(SingleMaterial);
