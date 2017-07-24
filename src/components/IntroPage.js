import React from "react";
import { Link } from "react-router-dom";

const IntroPage = () =>
  <div className="ui grid">
    <div className="four wide column">
      <h1 className="ui header">
        Compute the elastic properties of{" "}
        <span className="nobr">nano-composites</span>
      </h1>
      <p>
        Our tool implements a linear-elasticity method of{" "}
        <a href="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.33.5891">
          M. Grimsditch and F. Nizzoli
        </a>. It computes <b>anisotropic elastic properties of coherent nano-composites</b> using
        matrices of elastic constants of co-existing phases as the input.
        Elastic properties are visualized in the form of{" "}
        <b>directional dependencies of selected measures</b>. Importantly, the
        tool can handle <b>more than two phases</b> and allows for including
        internal rotation of coexisting phases.
      </p>
      
      <div className="ui buttons">
  <Link className="ui positive button" to="/enter"><i className="edit icon" /> Try now</Link>
  <div className="or"></div>
  <Link className="ui blue right labeled icon button" to="/enter">
  <i className="right arrow icon"></i>
Read more</Link>
</div>
    </div>

    <div className="twelve wide column">
      <div className="ui medium images">
        {[1, 2, 3, 4, 5, 6].map(i =>
          <img
            src={`./images/${i}.png`}
            className="ui image"
            key={`./images/${i}.png`}
          />
        )}
      </div>
    </div>
  </div>;

export default IntroPage;
