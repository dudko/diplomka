import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import math from 'mathjs'
import numeric from 'numeric'

import { DEFAULT_ELASTICITY } from '../constants/defaults'
import { addToComposite, removeMatrix } from '../actions'

import TextArea from '../components/TextArea'
import MaterialProjectSearch from '../components/MaterialProjectSearch'

class MaterialInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matrix: DEFAULT_ELASTICITY,
      error: null,
      searchOn: false,
    }
    this.addToComposite = this.addToComposite.bind(this)
  }

  addToComposite(matrix) {
    if (matrix.length !== 6) {
      this.setState({
        error: {
          title: 'Invalid matrix',
          text: `Number of rows: ${
            matrix.length
          }. Matrix dimension must be 6x6.`,
        },
      })
      return
    }

    for (let i = 0; i < 6; i++) {
      if (matrix[i].length !== 6) {
        this.setState({
          error: {
            title: 'Invalid matrix',
            text: `Number of columns: ${
              matrix.length
            }. Matrix dimension must be 6x6.`,
          },
        })
        return
      }

      for (let j = 0; j < 6; j++) {
        if (isNaN(matrix[i][j])) {
          this.setState({
            error: {
              title: 'Invalid value',
              text: `${matrix[i][j]} is not a number`,
            },
          })
          return
        }
      }
    }

    try {
      math.inv(matrix)
    } catch (e) {
      this.setState({
        error: {
          title: 'Invalid matrix',
          text: `${e.message}.`,
        },
      })
      return
    }

    try {
      const eigenvals = numeric.eig(matrix).lambda.x

      if (eigenvals.some(x => x < 0)) {
        this.setState({
          error: {
            title: 'All eigenvalues must be positive',
            text: JSON.stringify(eigenvals),
          },
        })
        return
      }
    } catch (e) {
      this.setState({
        error: {
          title: 'Invalid matrix',
          text: 'Cannot calculate eigenvalues.',
        },
      })
      return
    }

    this.setState({ error: null }, () => this.props.addToComposite(matrix))
  }

  render() {
    const { matrix, error } = this.state
    const { materials, removeMatrix } = this.props

    return (
      <div className="ui centered grid">
        <div className="six wide column">
          {this.state.searchOn ? (
            <MaterialProjectSearch
              setMatrix={matrix =>
                this.setState(
                  {
                    searchOn: false,
                  },
                  () => this.addToComposite(matrix)
                )
              }
            />
          ) : (
            <div className="ui form">
              <h1 className="ui header">
                Enter elastic constants
                <div className="sub header">
                  The stiffness matrix is the 6x6-element square matrix A
                </div>
              </h1>
              {error && (
                <div className="ui negative tiny message">
                  <i
                    className="close icon"
                    onClick={() => this.setState({ error: null })}
                  />

                  <div className="content">
                    <div className="header">{error.title}</div>
                    <p>
                      {[
                        error.text,
                        <br />,
                        <Link
                          to={{
                            pathname: '/about',
                            hash: '#input-validation',
                          }}
                        >
                          More details
                        </Link>,
                      ]}
                    </p>
                  </div>
                </div>
              )}

              <TextArea
                matrix={matrix}
                setElasticity={matrix => this.setState({ matrix })}
              />
              <br />
              <button
                className="ui green button"
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
                    error: null,
                  })
                }}
              >
                <i className="eraser icon" /> Reset
              </button>
              <button
                className="ui yellow button"
                onClick={() => {
                  this.setState({
                    searchOn: true,
                  })
                }}
              >
                <i className="search icon" /> Use Search
              </button>
            </div>
          )}
        </div>

        <div className="four wide column" />

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
