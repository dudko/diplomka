import React from "react";
import { Link } from "react-router-dom";

export default ({ location }) =>
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

      <div className="right secondary menu">
        <Link
          className={location.pathname === "/input" ? "active item" : "item"}
          to="/input"
        >
          <i className="edit icon" /> Input
        </Link>
        <Link
          className={location.pathname === "/adjust" ? "active item" : "item"}
          to="/adjust"
        >
          <i className="settings icon" /> Adjust
        </Link>
        <Link
          className={
            location.pathname === "/calculate" ? "active item" : "item"
          }
          to="/calculate"
        >
          <i className="hourglass half icon" /> Calculate
        </Link>
      </div>
    </div>
  </div>;
