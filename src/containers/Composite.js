import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as api from '../api';
import { addToCompare } from '../actions';
import { DEFAULT_ELATE, DEFAULT_ELASTICITY } from '../constants/defaults';


import CompositeRatio from '../components/CompositeRatio';
import Reorientation from '../components/Reorientation';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';
import Properties from '../components/Properties';
import Plot from '../components/Plot';
import PlotRatioVariations from '../components/PlotRatioVariations';

// eslint-disable-next-line
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
    const { elasticities, results, worker, elateAnalysis,
      redraw, rotation, ratio, colorScheme, colorbarRange, processing,
      error } = this.state;
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
                  worker.postMessage({
                    elasticities,
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
                <Reorientation
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

      </div>
    );
  }
}

export default connect(null, { addToCompare })(Composite);
