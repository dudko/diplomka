import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';

const PlotlyComponent = createPlotlyComponent(Plotly);

const RangeRun = ({ results }) => {
  const { x, Y: y } = results;
  const data = [{
    x,
    y,
    line: {shape: 'spline'},
    type: 'scatter'
  }];

  const config = {
    displayModeBar: false
  };

  return (
    <PlotlyComponent
      data={data}
      config={config}
    />
  );
};


export default RangeRun;
