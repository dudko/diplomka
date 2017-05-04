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
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';
import Properties from '../components/Properties';
import Plot from '../components/Plot';
import PlotRatioVariations from '../components/PlotRatioVariations';
import TextAreaElasticity from './TextAreaElasticity';

const CreateWorker = require('worker-loader!../worker');

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
      worker: new CreateWorker(),
      elateAnalysis: DEFAULT_ELATE,
      redraw: false,
      ratio: 0.5,
      rotation: [0, 0, 1],
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined,
      },
      processing: false,
      error: '',
      advanceInput: [false, false],
    };
  }

  /* Prevent plotly to update frequently */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.redraw) {
      this.setState({
        redraw: false,
      });
    }
  }

  render() {
    const { elasticities, crystalSystems, results, worker, elateAnalysis,
      redraw, rotation, ratio, colorScheme, colorbarRange, processing,
      error, advanceInput } = this.state;
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

          <PlotRatioVariations
            results={results.ratioVariations}
          />

          <div>
            <div>
              {results.compositeElasticity.length > 0 && <h5>Calculated elasticty</h5>}
              <table
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                }}
              >
                <tbody>
                  {results.compositeElasticity.map((row, index) =>
                    <tr key={index}>
                      {row.map((cell, index) =>
                        <td key={index}>{cell.toFixed(3)}</td>)}
                    </tr>,
                  )}
                </tbody>
              </table>
            </div>

            <div>
              {results.rotatedTensors.length > 0 && <h5>Rotated elasticities</h5>}
              {results.rotatedTensors.map(rotated =>
                <table
                  style={{
                    tableLayout: 'fixed',
                    width: '100%',
                    marginBottom: '15px',
                  }}
                >
                  <tbody>
                    {rotated.map((row, index) =>
                      <tr key={index}>
                        {row.map((cell, index) =>
                          <td key={index}>{cell.toFixed(3)}</td>)}
                      </tr>,
                    )}
                  </tbody>
                </table>,
              )}
            </div>
          </div>
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
                className="success tooltip-left"
                disabled={processing}
                data-tooltip="With linear-elasticity method by M. Grimsditch and F. Nizzoli"
                onClick={() => {
                  this.setState({
                    processing: true,
                    error: '',
                  });
                  const elasticityValues = elasticities.map(elasticity =>
                    elasticity.map(row => row.map(cell => cell.value)));
                  worker.postMessage({
                    elasticities: elasticityValues,
                    ratio,
                    rotation,
                  });
                  worker.onmessage = (msg) => {
                    this.setState({ results: msg.data, redraw: true, processing: false });
                    api.sendToElate(msg.data.compositeElasticity,
                      tables => this.setState({ elateAnalysis: tables }));
                  };
                  worker.addEventListener('error', (e) => {
                    this.setState({
                      processing: false,
                      error: e.message,
                    });
                  });
                }}
              >
                {processing ? '⚙️ Processing...' : ' ⚙️ Process'}
              </button>
            </div>

            <div
              className="flex half"
            >
              <ColorScheme
                colorScheme={colorScheme}
                setColorScheme={colorScheme => this.setState({ colorScheme })}
              />
              <ColorbarRange
                setColorbarRange={range => this.setState({
                  colorbarRange: { ...colorbarRange, ...range } })}
              />

              <div
                className="flex two"
              >
                <CompositeRotation
                  updateRotation={rotation => this.setState({ rotation })}
                />
                <CompositeRatio
                  updateRatio={value => this.setState({ ratio: value })}
                />
              </div>
            </div>
          </header>
          {error &&
            <footer>
              {`⚠️ ${error.replace(/^(.+?):/, '')}.`}
            </footer>}
        </div>

        {/* Main inputs */}
        <div className="flex two">

          {['First', 'Second'].map((name, materialIndex) =>
            <div key={materialIndex}>
              <h1>
                <span
                  className="label"
                  style={{
                    background: '#85144b',
                  }}
                >
                  {`${name} material`}
                </span>
              </h1>

              <div>
                <label
                  style={{
                    float: 'right',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={advanceInput[materialIndex]}
                    onChange={() => {
                      const nextAdvanceInput = _.cloneDeep(advanceInput);
                      const nextCrystalSystems = [...crystalSystems];
                      nextCrystalSystems[materialIndex] = 'any';
                      nextAdvanceInput[materialIndex] = !nextAdvanceInput[materialIndex];
                      this.setState({
                        advanceInput: nextAdvanceInput,
                        crystalSystems: nextCrystalSystems,
                      });
                    }}
                  />
                  <span className="checkable">Advance input</span>
                </label>

                {advanceInput[materialIndex] ?
                  <div>
                    <TextAreaElasticity
                      elasticity={elasticities[materialIndex]}
                      setElasticity={(elasticity) => {
                        const nextElasticity = _.cloneDeep(elasticities);
                        nextElasticity[materialIndex] = elasticity;
                        this.setState({ elasticities: nextElasticity });
                      }}
                    />
                  </div>
                :
                  <div>
                    <InputElasticity
                      elasticity={elasticities[materialIndex]}
                      crystalSystem={crystalSystems[materialIndex]}
                      setElasticity={(elasticity) => {
                        const nextElasticity = _.cloneDeep(elasticities);
                        nextElasticity[materialIndex] = elasticity;
                        this.setState({ elasticities: nextElasticity });
                      }}
                      setCrystalSystem={(crystalSystem) => {
                        const nextCrystalSystems = [...crystalSystems];
                        nextCrystalSystems[materialIndex] = crystalSystem;
                        this.setState({ crystalSystems: nextCrystalSystems });
                      }}
                    />
                  </div>
                }
              </div>

              <MaterialProjectSearch
                setElasticity={(foundElasticity, foundCrystalSystem) => {
                  const nextElasticities = _.cloneDeep(elasticities);
                  nextElasticities[materialIndex] = foundElasticity;
                  const nextCrystalSystems = _.cloneDeep(crystalSystems);
                  nextCrystalSystems[materialIndex] = foundCrystalSystem;
                  this.setState({
                    elasticities: nextElasticities,
                    crystalSystems: nextCrystalSystems,
                  });
                }}
              />
            </div>,
          )}

        </div>
      </div>
    );
  }
}

export default connect(null, { addToCompare })(Composite);
