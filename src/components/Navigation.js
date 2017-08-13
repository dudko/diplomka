import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = ({ count }) =>
  <div className="ui fixed stackable menu">
    <div className="ui container">
      <Link className="header item" to="/">
        <i className="home icon" /> MELASA
      </Link>
      <Link className="item" to="/about">
        <i className="info icon" /> About
      </Link>

      <div className="right secondary menu">
        <Link className="item" to="/input">
          <i className="edit icon" /> Input
        </Link>
        <Link className="item" to="/adjust">
          <i className="settings icon" /> Adjust
        </Link>
        <Link className="item" to="/calculate">
          <i className="hourglass half icon" /> Calculate
        </Link>
      </div>
    </div>
  </div>;

const mapStateToProps = state => ({
  count: state.length
});

export default connect(mapStateToProps)(Navigation);
