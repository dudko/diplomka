import React from 'react';

const IntroPage = () => (
  <div
    className="flex two"
    style={{
      margin: "60px auto",
    }}
  >
  
  <div
    className="fourth"
    style={{
      padding: '10px 20px'
    }}
  >
    <h2>Scientific tool dealing with elastic properties of materials</h2>
    <p>
      Main features of the tool include calculation of <b>nano-composite elasticity</b> and visualization of calculated directional dependence of <b>Young's modulus and linear compressibility</b>, especially useful for a better understanding of material elasticity.
    </p>
    <a className="button success" href="/enter">
      <i className="fa fa-edit" /> Try it now
    </a>
  </div>
  
  <div
    className="three-fourth"
  >
    {[1, 2, 3, 4, 5, 6].map(i => <img
      src={`./images/${i}.png`}
      style={{
        padding: '1em'
      }}
      className="third"
      key={`./images/${i}.png`}
    />)}
  </div>
  </div>
);

export default IntroPage;
