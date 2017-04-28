import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl3d';

const PlotlyComponent = createPlotlyComponent(Plotly);

const Chart = ({ points }) => {
  const { x, y, z, Y } = points;
  const data = [{
    x,
    y,
    z,
    mode: 'markers',
    text: Y,
    marker: {
      size: 12,
      color: Y,
      colorscale: 'Jet',
      opacity: 1,
      colorbar: {}
    },
    type: 'scatter3d'
  }];

  const layout = {
    autosize: false,
    width: 600,
    height: 600,
    margin: {
      l: 0,
      r: 0,
      b: 10,
      t: 0,
      pad: 0
    }
  };

  const config = {
    displayModeBar: false
  };

  return (
    <PlotlyComponent
      className='chart'
      data={data}
      layout={layout}
      config={config}
    />
  );
};

export default Chart;
