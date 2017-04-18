import React, { Component } from 'react';
import Matrix from '../Matrix';
import CrystalSystemSelect from '../../containers/CrystalSystemSelect';
import MaterialProjectSearch from '../MaterialProjectSearch';
import Button from '../Button';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl3d';
const PlotlyComponent = createPlotlyComponent(Plotly);


export default class Phase extends Component {
  render() {
    const { submitPhase, material } = this.props;

    if (material.points) {
      var trace1 = {
      x: material.points.x,
      y: material.points.y,
      z: material.points.z,
      mode: 'markers',
      marker: {
        size: 12,
        color: material.points.Y,
        colorscale: 'Jet',
        opacity: 1
      },
      type: 'scatter3d'
    };

    var data = [trace1];
    var layout = {
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 20
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
  }

  return (
    <form>
      <CrystalSystemSelect />
      <Matrix
        rowCount={6}
        columnCount={6}
      />
      <MaterialProjectSearch />
      <Button
        onClick={() => submitPhase(
          material.elasticity.map(row => row.map(cell => cell.value)))}
      >
        Submit
      </Button>
      {material.points ?
        <PlotlyComponent data={data} layout={layout}/> :
        <h5>No data</h5>
      }
    </form>
  )
  }
}
