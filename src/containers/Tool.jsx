import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import MaterialInput from './MaterialInput'
import Adjust from './Adjust'
import Calculate from './Calculate'

export default ({ match, location }) => (
  <div className="ui container">
    <div className="ui menu">
      <div className="ui three ordered steps">
        <div className={location.pathname === '/tool' ? 'active step' : 'step'}>
          <div className="content">
            <Link to="/tool">
              <div className="title">Enter</div>
              <div className="description">elastic constants</div>
            </Link>
          </div>
        </div>

        <div
          className={
            location.pathname === '/tool/adjust' ? 'active step' : 'step'
          }
        >
          <div className="content">
            <Link to="/tool/adjust">
              <div className="title">Adjust</div>
              <div className="description">rotations and fractions</div>
            </Link>
          </div>
        </div>

        <div
          className={
            location.pathname === '/tool/calculate' ? 'active step' : 'step'
          }
        >
          <div className="content">
            <Link to="/tool/calculate">
              <div className="title">Compute</div>
              <div className="description">elastic properties</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Switch style={{ flex: 1 }}>
      <Route exact path={`${match.path}`} component={MaterialInput} />
      <Route path={`${match.path}/adjust`} component={Adjust} />
      <Route path={`${match.path}/calculate`} component={Calculate} />
    </Switch>
  </div>
)
