import React from 'react'
import logoIPM from '../assets/logoIPM.png'
import logoCerit from '../assets/cerit-sc-logo.png'

import Newsletter from './Newsletter'

export default ({ count }) => (
  <div className="ui inverted vertical segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="four wide column">
          <h4 className="ui inverted header">Developed in cooperation with:</h4>
          <div className="ui inverted link list">
            <a href="http://www.ipm.cz/">
              <img
                src={logoIPM}
                alt="Institute of Physics of Materials"
                className="ui tiny footer image"
              />
            </a>
            <p>
              <b>Institute of Physics of Materials</b>
              <br />
              Academy of Sciences of the Czech Republic<br />
            </p>

            <p>
              <i>Consultant:</i>{' '}
              <a
                href="http://www.ipm.cz/peoples-mgr-martin-friak-phd.html"
                className="item"
              >
                Mgr. Martin Friák, Ph.D.
              </a>
            </p>
          </div>
        </div>

        <div className="four wide column">
          <h4 className="ui inverted header">Developed and supported:</h4>
          <div className="ui inverted link list">
            <a href="https://www.cerit-sc.cz/">
              <img
                src={logoCerit}
                alt="CERIT Scientific Cloud"
                className="ui tiny footer image"
              />
            </a>
            <p>
              <b>CERIT Scientific Cloud</b>
              <br />
              Institute of Computer Science<br />
              Masaryk University
            </p>

            <p>
              <i>Developer:</i>{' '}
              <a href="https://github.com/dudko" className="item">
                Mgr. Dušan Lago
              </a>
            </p>
          </div>
        </div>

        <div className="five wide column">
          <Newsletter />
          <div className="ui inverted link list" style={{ textAlign: 'right' }}>
            <a href="https://github.com/dudko/melasa" className="item">
              <i className="small github icon" style={{ fontSize: '1.5em' }} />
            </a>
            <span className="item">2018</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
