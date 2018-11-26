import React, { Component } from 'react'
import { connect } from 'react-redux'

import { isValidFractionSum } from '../helpers'
import { calculate } from '../actions/workerActions'

import NoMaterialsAdded from '../components/NoMaterialsAdded'
import Plot from '../components/Plot'
import InvalidFractionModal from '../components/InvalidFractionModal'

class Calculate extends Component {
  state = {
    tables: [],
    processing: false,
    invalidFraction: false,
  }

  analyse = matrix => {
    let body = matrix.map(row => row.join('+')).join('%0D%0A')
    body = `matrix=${body}`

    fetch(
      'https://cors-anywhere.herokuapp.com/http://progs.coudert.name/elate',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'text/html',
        }),
        body,
      }
    )
      .then(response => response.text())
      .then(response => {
        const htmlResponse = document.createElement('html')
        htmlResponse.innerHTML = response

        const tableNodesList = htmlResponse.getElementsByTagName('table')
        const tables = []

        for (let i = 0; i < tableNodesList.length; i++) {
          const tableRows = tableNodesList[i].getElementsByTagName('tr')
          let table = `<thead><tr>${tableRows[0].innerHTML}</tr></thead><tbody>`
          for (let j = 1; j < tableRows.length; j++) {
            table += `<tr>${tableRows[j].innerHTML}</tr>`
          }
          table += '</tbody>'
          tables.push(table)
        }

        this.setState({ tables })
      })
  }

  componentWillMount() {
    const { materials } = this.props
    const invalidFraction = !isValidFractionSum(materials)
    const processing = !invalidFraction && materials.size

    this.setState({
      invalidFraction,
      processing,
    })

    if (processing) {
      const materialsRaw = materials.reduce((result, material) => {
        result.push({
          matrix: material.get('matrix'),
          fraction: material.get('fraction'),
        })
        return result
      }, [])

      console.log(materialsRaw)

      this.props.calculate(materialsRaw)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      processing: false,
    })
    // this.analyse(nextProps.results.compositeMatrix)
  }

  render() {
    const { materials, results } = this.props
    const { processing, invalidFraction } = this.state

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
      <div className="ui grid">
        <div className="two column centered row">
          <div className="eigth wide column">
            <Plot
              key={'youngs'}
              points={results}
              redraw={true}
              propertyName={'youngs'}
              title={"Young's modulus"}
              unit={'GPa'}
            />
          </div>
          <div className="eigth wide column">
            <Plot
              key={'compress'}
              points={results}
              redraw={true}
              propertyName={'compress'}
              title={'Linear compressibility'}
            />
          </div>
        </div>

        <div className="row">
          <div className="six wide column">
            <h3>Elasticty matrix of final composite</h3>
            {this.props.results.compositeMatrix && (
              <table className="ui table">
                <tbody>
                  {this.props.results.compositeMatrix.map((row, index) => (
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
            )}
          </div>
        </div>

        {/* <div className="row">
          <div className="sixteen wide column">
            <h3>Results of external analysis</h3>
          </div>
          {this.state.tables.length > 0 &&
            this.state.tables.map((table, index) => (
              <div
                key={index}
                className={`${index < 2 ? 'eight' : 'sixteen'} wide column`}
              >
                <table
                  className="ui celled striped table"
                  dangerouslySetInnerHTML={{ __html: table }}
                />
              </div>
            ))}
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  materials: state.materials,
  results: state.results,
})

export default connect(
  mapStateToProps,
  { calculate }
)(Calculate)
