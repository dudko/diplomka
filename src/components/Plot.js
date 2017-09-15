/* global Plotly */
import React, { Component } from "react";

class Plot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    let { points, propertyName, unit, cmin, cmax, colorScheme } = this.props;

    let { x, y, z } = points;

    const property = points[propertyName];

    const layout = {
      autosize: true,
      font: {
        size: 15
      },
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
      modeBarButtons: [["toImage", "resetViews"]]
    };

    Plotly.newPlot(
      `plot-${propertyName}`,
      [
        {
          x: x.map((x, index) => x * property[index]),
          y: y.map((y, index) => y * property[index]),
          z: z.map((z, index) => z * property[index]),
          type: "scatter3d",
          mode: "markers",
          text: property,
          marker: {
            size: 12,
            color: property,
            colorscale: colorScheme || "Jet",
            opacity: 1,
            colorbar: {
              title: unit,
              lenmode: "fraction",
              len: 0.9
            },
            cmin,
            cmax
          }
        }
      ],
      layout,
      config
    )
      .then(gd =>
        Plotly.toImage(gd, { format: "svg", height: 500, width: 500 })
      )
      .then(i => console.log(i));
  }

  render() {
    const { title, propertyName } = this.props;
    const { data } = this.state;
    return (
      <div>
        <h3> {title} </h3>
        <div id={`plot-${propertyName}`} />
        <a href={data} target="_blank">
          SVG
        </a>
      </div>
    );
  }
}

export default Plot;
