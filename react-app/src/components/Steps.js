import React from "react";

export default () => (
  <div className="ui ordered steps container">
    <div className="active step">
      <div className="content">
        <div className="title">Enter</div>
        <div className="description">Elastic constants</div>
      </div>
    </div>
    <div className="step">
      <div className="content">
        <div className="title">Adjust</div>
        <div className="description">Rotate and set fraction</div>
      </div>
    </div>
    <div className="step">
      <div className="content">
        <div className="title">Compute</div>
        <div className="description">Get results and visualisations</div>
      </div>
    </div>
  </div>
);
