import React, { Component } from 'react'
import { connect } from 'react-redux'
import math from 'mathjs'

import { DEFAULT_ELASTICITY } from '../constants/defaults'
import { addToComposite, removeMatrix } from '../actions'

import TextArea from '../components/TextArea'
import MaterialProjectSearch from '../components/MaterialProjectSearch'

class MaterialInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matrix: DEFAULT_ELASTICITY,
      invalidMatrix: false,
    }
    this.addToComposite = this.addToComposite.bind(this)
  }

  addToComposite(matrix) {
    try {
      // number of rows
      if (matrix.length !== 6) throw new Error('format')

      for (let i = 0; i < 6; i++) {
        // number of columns
        if (matrix[i].length !== 6) throw new Error('format')

        for (let j = 0; j < 6; j++) {
          if (isNaN(matrix[i][j])) throw new Error('NaN')
        }
      }
    } catch (e) {
      if (e.message === 'format') {
        this.setState({ invalidMatrix: 'format' })
      }
      if (e.message === 'NaN') {
        this.setState({ invalidMatrix: 'NaN' })
      }

      return
    }

    try {
      math.inv(matrix)
      this.props.addToComposite(matrix)
      this.setState({ invalidMatrix: null })
    } catch (e) {
      this.setState({
        invalidMatrix: 'determinant',
      })
    }
  }

  render() {
    const { matrix, invalidMatrix } = this.state
    const { materials, removeMatrix } = this.props

    return (
      <div className="ui centered grid">
        <div className="six wide column">
          <div className="ui form">
            <h1 className="ui header">
              Enter elastic constants
              <div className="sub header">
                The stiffness matrix is the 6x6-element square matrix A
              </div>
            </h1>
            {invalidMatrix && (
              <div className="ui negative tiny message">
                <i
                  className="close icon"
                  onClick={() => this.setState({ invalidMatrix: null })}
                />
                <div className="content">
                  <div className="header">Invalid matrix</div>

                  {invalidMatrix === 'format' && (
                    <p>Number of rows or columns.</p>
                  )}
                  {invalidMatrix === 'NaN' && <p>Invalid value.</p>}
                  {invalidMatrix === 'determinant' && (
                    <p>Determinant must be non-zero value.</p>
                  )}
                </div>
              </div>
            )}

            <TextArea
              matrix={matrix}
              setElasticity={matrix => this.setState({ matrix })}
            />
            <br />
            <button
              className="ui blue button"
              onClick={() => {
                this.addToComposite(matrix)
              }}
            >
              <i className="plus icon" /> Add
            </button>
            <button
              className="ui blue button"
              onClick={() => {
                this.setState({
                  matrix: DEFAULT_ELASTICITY,
                })
              }}
            >
              <i className="eraser icon" /> Clear
            </button>
          </div>

          <div className="ui horizontal divider">Or</div>

          <MaterialProjectSearch
            setMatrix={matrix =>
              this.setState({
                matrix,
              })
            }
          />
        </div>

        <div className="one wide column" />

        <div className="six wide column">
          {materials.map((material, key) => (
            <table key={key} className="ui table">
              <thead>
                <tr>
                  <th colSpan="6">
                    <button
                      className="ui mini red icon button"
                      onClick={() => removeMatrix(key)}
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
                    <tr key={`mat-${index}`}>
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
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
})

export default connect(mapStateToProps, {
  addToComposite,
  removeMatrix,
})(MaterialInput)
