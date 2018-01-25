import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isValidFractionSum } from '../helpers'
import { calculate } from '../actions/workerActions'

import NoMaterialsAdded from '../components/NoMaterialsAdded'
import Plot from '../components/Plot'
import InvalidFractionModal from '../components/InvalidFractionModal'

class Calculate extends Component {
  state = {
    results: this.props.results,
    processing: false,
    invalidFraction: false,
  }

  componentWillMount() {
    const { materials } = this.props
    const invalidFraction = !isValidFractionSum(materials)
    const processing = !invalidFraction && materials.size

    this.setState({
      invalidFraction,
      processing,
    })

    if (!invalidFraction && processing) {
      const materialsRaw = materials.reduce((result, material) => {
        result.push({
          matrix: material.get('matrix'),
          fraction: material.get('fraction'),
        })
        return result
      }, [])

      this.props.calculate(materialsRaw)
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
    const { materials } = this.props
    const { processing, results, invalidFraction } = this.state

    if (!materials.size) return <NoMaterialsAdded />
    if (invalidFraction) return <InvalidFractionModal />
    if (processing)
      return (
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">
            Running calculations
          </div>
        </div>
      )

    return (
      <div className="ui centered grid">
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
  results: state.results,
})

export default connect(mapStateToProps, { calculate })(Calculate)
