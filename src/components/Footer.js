import React from 'react'
import logoIPM from '../assets/logoIPM.png'
import logoCerit from '../assets/cerit-sc-logo.png'

import Newsletter from './Newsletter'

export default ({ count }) => (
  <div className="ui inverted vertical segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="four wide column">
          <i>Developed in cooperation with:</i>
          <img
            src={logoIPM}
            alt="Institute of Physics of Materials"
            className="ui tiny footer image"
          />
          <p>
            <b>Institute of Physics of Materials</b>
            <br />
            Academy of Sciences of the Czech Republic<br />
          </p>
        </div>

        <div className="four wide column">
          <i>Supported by:</i>
          <img
            src={logoCerit}
            alt="CERIT Scientific Cloud"
            className="ui tiny footer image"
          />
          <p>
            <b>CERIT Scientific Cloud</b>
            <br />
            Institute of Computer Sciences<br />
            Masaryk University
          </p>
        </div>

        <div className="five wide column">
          <Newsletter />
        </div>
      </div>
    </div>
  </div>
)
