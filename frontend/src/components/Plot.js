import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl3d';

const PlotlyComponent = createPlotlyComponent(Plotly);

PlotlyComponent.prototype.shouldComponentUpdate = (nextProps) => {
  return nextProps.config.redraw;
}

const Plot = ({ points, propertyName, redraw, title, cmin, cmax, colorScheme }) => {
  let { x, y, z } = points;

  let property = points[propertyName];

  x = x.map((x, index) => x*property[index]);
  y = y.map((y, index) => y*property[index]);
  z = z.map((z, index) => z*property[index]);

  const data = [{
    x,
    y,
    z,
    mode: 'markers',
    text: property,
    marker: {
      size: 12,
      color: property,
      colorscale: colorScheme || 'Jet',
      opacity: 1,
      colorbar: {
        title: 'GPa', 
        lenmode: 'fraction',
        len: 0.9
      },
      cmin,
      cmax
    },
    type: 'scatter3d'
  }];

  const layout = {
    autosize: true,
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
    displayModeBar: true,
    displaylogo: false,
    redraw,
    modeBarButtons: [[
      'toImage', 
      'resetViews'
    ]]

  };

  return (
    <div>
      <h3>{title}</h3>
      <PlotlyComponent
        className='Plot'
        data={data}
        layout={layout}
        config={config}
      />
    </div>
  );
};

export default Plot;