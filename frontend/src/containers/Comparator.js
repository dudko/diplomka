import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plot from '../components/Plot';
import ColorScheme from '../components/ColorScheme';
import ColorbarRange from '../components/ColorbarRange';

import { updateCompared } from '../actions';

class Comparator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minYoung: null,
      maxYoung: null,
      toCompare: this.props.toCompare,
      colorScheme: 'Jet',
      colorbarRange: {
        min: undefined,
        max: undefined,
      },
    };
  }

  componentWillMount() {
    const { toCompare } = this.props;

    let minYoung = toCompare.map(result => Math.min(...result.youngs));
    minYoung = Math.min(...minYoung);

    let maxYoung = toCompare.map(result => Math.max(...result.youngs));
    maxYoung = Math.max(...maxYoung);

    this.setState({
      minYoung,
      maxYoung,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { toCompare } = nextProps;

    let minYoung = toCompare.map(result => Math.min(...result.youngs));
    minYoung = Math.min(...minYoung);

    let maxYoung = toCompare.map(result => Math.max(...result.youngs));
    maxYoung = Math.max(...maxYoung);

    this.setState({
      minYoung,
      maxYoung,
      toCompare,
    });
  }

  render() {
    const { updateCompared } = this.props;
    const { minYoung, maxYoung, toCompare, colorScheme, colorbarRange } = this.state;

    return (
      <div
        className="flex"
      >
        {toCompare.length > 0 ?
          <div
            className="flex two"
          >
            <div
              className="card full"
            >
              <header>
                <button
                  type="button"
                  className="error"
                  onClick={() => updateCompared([])}
                  style={{
                    float: 'right',
                  }}
                >
                  ❌ Remove all
                </button>

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
                </div>

              </header>
            </div>
            {toCompare.map((result, index) =>
              <div
                key={index}
              >
                <button
                  className="button error"
                  key={index}
                  onClick={() => updateCompared(toCompare.filter((result, resultIndex) => resultIndex !== index))}
                  style={{
                    fontSize: '.75em',
                  }}
                >
                  ❌
                </button>
                <Plot
                  key={`${index}-youngs`}
                  points={result}
                  redraw
                  propertyName={'youngs'}
                  unit={'GPa'}
                  cmin={colorbarRange.min || minYoung}
                  cmax={colorbarRange.max || maxYoung}
                  colorScheme={colorScheme}
                />
              </div>,
            )}
          </div>
        :
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            Nothing to compare. Add results with <span className="label warning">➕ Compare</span>.
          </h3>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toCompare: state,
});

export default connect(mapStateToProps, { updateCompared })(Comparator);
