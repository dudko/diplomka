import React from "react";
import { Link } from "react-router-dom";

export default ({ location }) => (
  <div className="ui fixed stackable menu">
    <div className="ui container">
      <Link className="header item" to="/">
        <i className="home icon" /> MELASA
      </Link>
      <Link
        className={location.pathname === "/tool" ? "active item" : "item"}
        to="/tool"
      >
        <i className="edit icon" /> Tool
      </Link>
      <Link
        className={location.pathname === "/about" ? "active item" : "item"}
        to="/about"
      >
        <i className="info icon" /> About
      </Link>
    </div>
  </div>
);
