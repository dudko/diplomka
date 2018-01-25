import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isValidFractionSum } from '../helpers'
import { calculate } from '../actions/workerActions'

import NoMaterialsAdded from '../components/NoMaterialsAdded'
import Plot from '../components/Plot'
import InvalidFractionModal from '../components/InvalidFractionModal'

class Calculate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.results,
      processing: false,
      invalidFraction: false,
    }
  }

  componentDidMount() {
    const { materials } = this.props

    if (!isValidFractionSum(materials)) {
      this.setState({
        invalidFraction: true,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { materials, results } = nextProps
    this.state = {
      results: results,
      processing: false,
    }

    if (!isValidFractionSum(materials)) {
      this.setState({
        invalidFraction: true,
      })
    }
  }

  render() {
    const { materials, calculate } = this.props
    const { processing, results, invalidFraction } = this.state

    if (!materials.size) return <NoMaterialsAdded />
    if (invalidFraction) return <InvalidFractionModal />

    return (
      <div className="ui centered grid">
        {results && (
          <div>
            <Plot
              key={'youngs'}
              points={results}
              redraw={true}
              propertyName={'youngs'}
              title={"Young's modulus"}
              unit={'GPa'}
            />
            <Plot
              key={'compress'}
              points={results}
              redraw={true}
              propertyName={'compress'}
              title={'Linear compressibility'}
            />
          </div>
        )}

        <div className="ui row">
          {!processing ? (
            <button
              type="button"
              className="ui green icon button"
              onClick={() => {
                const materialsRaw = materials.reduce((result, material) => {
                  result.push({
                    matrix: material.get('matrix'),
                    fraction: material.get('fraction'),
                  })
                  return result
                }, [])
                calculate(materialsRaw)
                this.setState({ processing: true })
              }}
            >
              Start calculations <i className="icon wizard" />
            </button>
          ) : (
            <div className="ui active inverted dimmer">
              <div className="ui indeterminate text loader">
                Running calculations
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
  results: state.results,
})

export default connect(mapStateToProps, { calculate })(Calculate)
