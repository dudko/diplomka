import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';
import { connect } from 'react-redux';

const PlotlyComponent = createPlotlyComponent(Plotly);

const RangeRun = ({ rangeRunPoints }) => {
  const { x, Y: y } = rangeRunPoints;
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

const mapStateToProps = (state) => ({
  rangeRunPoints: state.rangeRun
});

export default connect(mapStateToProps)(RangeRun);