import React from "react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";

const IntroPage = () => (
  <div className="ui centered grid">
    <div className="five wide column" style={{ alignSelf: "center" }}>
      <h1 className="ui header">
        Compute the elastic properties of{" "}
        <span className="nobr">nano-composites</span>
      </h1>
      <p>
        Our tool implements a linear-elasticity method of{" "}
        <a href="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.33.5891">
          <span className="nobr">M. Grimsditch and F. Nizzoli</span>
        </a>
        . It computes{" "}
        <b>anisotropic elastic properties of coherent nano-composites</b> using
        matrices of elastic constants of co-existing phases as the input.
        Elastic properties are visualized in the form of{" "}
        <b>
          directional dependencies of selected elastic characteristics (Young´s
          modulus and linear compressibility)
        </b>
        . Importantly, the tool can handle <b>more than two phases</b> and
        allows for including internal rotation of coexisting phases.
      </p>

      <div className="ui buttons">
        <Link className="ui positive button" to="/tool">
          <i className="edit icon" /> Try now
        </Link>
        <Link className="ui blue right labeled icon button" to="/about">
          <i className="right arrow icon" />
          Read more
        </Link>
      </div>
    </div>

    <div className="one wide column" />

    <div className="six wide column">
      <Gallery />
    </div>
  </div>
);

export default IntroPage;
