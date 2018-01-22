import React from 'react'
import { Link } from 'react-router-dom'
import logoIPM from '../assets/logoIPM.png'
import Newsletter from './Newsletter'

export default ({ count }) => (
  <div className="ui inverted vertical segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="four wide column">
          <h4 className="ui inverted header">Sitemap</h4>
          <div className="ui inverted link list">
            <Link className="item" to="/about">
              About
            </Link>
          </div>
          <Newsletter />
        </div>
        <div className="five wide column">
          <img
            src={logoIPM}
            alt="Institute of Physics of Materials"
            className="ui tiny image"
          />
          <b>Institute of Physics of Materials</b>
          <p>
            Academy of Sciences of the Czech Republic<br />
            Brno, Czech Republic<br />
          </p>
        </div>
        <div className="five wide column">
          <h4 className="ui inverted header">MU</h4>
        </div>
      </div>
    </div>
  </div>
)
