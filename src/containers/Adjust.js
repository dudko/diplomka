import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeMatrix, resetMatrix, setFraction } from '../actions'
import { rotateMatrix } from '../actions/workerActions'
import { isValidFractionSum } from '../helpers'

import Rotations from '../components/Rotations'
import Fraction from '../components/Fraction'
import NoMaterialsAdded from '../components/NoMaterialsAdded'

class Adjust extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    }

    if (!isValidFractionSum(materials)) {
      this.setState({
        invalidFraction: true,
      })
    }
  }
  render() {
    const {
      materials,
      removeMatrix,
      rotateMatrix,
      resetMatrix,
      setFraction,
    } = this.props

    const { invalidFraction } = this.state

    if (!materials.size) return <NoMaterialsAdded />

    return (
      <div className="ui centered grid">
        <h1 className="ui left aligned header">
          Optionaly adjust rotations and material ratios
          <div className="sub header">
            Re-orientation of the [0, 0, 1] axis into a new direction and
            subsequent rotation around it
          </div>
        </h1>
        {materials.map((material, index) => (
          <div className="row" key={index}>
            <div className="six wide column">
              <table className="ui table">
                <thead>
                  <tr>
                    <th colSpan="6">
                      <button
                        className="ui mini red icon button"
                        onClick={() => removeMatrix(index)}
                      >
                        <i className="close icon" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {material
                    .get('matrix')
                    .map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, index) => (
                          <td key={index}>
                            {Number(cell) % 1
                              ? Number(cell).toFixed(3)
                              : Number(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="one wide column" />

            <div className="six wide column">
              <Rotations
                axes={material.get('axes')}
                angle={material.get('angle')}
                matrix={material.get('matrix')}
                rotateMatrix={(axes, angle) =>
                  rotateMatrix(index, material.get('matrix'), axes, angle)
                }
                resetMatrix={() => resetMatrix(index)}
              />

              <br />
              <br />

              <Fraction
                fraction={material.get('fraction')}
                setFraction={fraction => setFraction(index, fraction)}
                invalidFraction={invalidFraction}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
})

export default connect(mapStateToProps, {
  removeMatrix,
  rotateMatrix,
  resetMatrix,
  setFraction,
})(Adjust)
