import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';

const PlotlyComponent = createPlotlyComponent(Plotly);

const RangeRun = ({ results }) => {
  const { x, youngs } = results;
  const data = [{
    x,
    y: youngs,
    line: {shape: 'spline'},
    type: 'scatter'
  }];

  const config = {
    displayModeBar: false
  };

  return (
    <div>
      <h3>{'Varying materials ratios'}</h3>
      <PlotlyComponent
        data={data}
        config={config}
      />
    </div>
  );
};


export default RangeRun;
