import React from "react";
import { Link } from "react-router-dom";

export default ({ location }) => (
  <div className="ui fixed stackable menu">
    <div className="ui container">
      <Link className="header item" to="/">
        <i className="home icon" /> MELASA
      </Link>
      <Link
        className={location.pathname === "/about" ? "active item" : "item"}
        to="/about"
      >
        <i className="info icon" /> About
      </Link>

      <div className="ui right">
        <div className="ui three tiny steps">
          <div
            className={location.pathname === "/input" ? "active step" : "step"}
          >
            <i className="edit icon" />
            <div className="content">
              <Link to="/input">
                <div className="title">Input</div>
                <div className="description">elastic constants</div>
              </Link>
            </div>
          </div>

          <div
            className={location.pathname === "/adjust" ? "active step" : "step"}
          >
            <i className="settings icon" />
            <div className="content">
              <Link to="/adjust">
                <div className="title">Adjust</div>
                <div className="description">rotations and fractions</div>
              </Link>
            </div>
          </div>

          <div
            className={
              location.pathname === "/calculate" ? "active step" : "step"
            }
          >
            <i className="hourglass half icon" />
            <div className="content">
              <Link to="/calculate">
                <div className="title">Compute</div>
                <div className="description">elastic properties</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
