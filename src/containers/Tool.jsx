import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import MaterialInput from './MaterialInput'
import Adjust from './Adjust'
import Calculate from './Calculate'

const steps = [
  {
    pathname: '/tool',
    title: 'Enter',
    description: 'elastic constants'
  },
  {
    pathname: '/tool/adjust',
    title: 'Adjust',
    description: 'rotations and fractions'
  },
  {
    pathname: '/tool/calculate',
    title: 'Compute',
    description: 'elastic properties'
  }
]

export default ({ match, location }) => (
  <div className="ui container">
    <div className="ui menu">
      <div className="ui three ordered steps">
        {
          steps.map(({ pathname, title, description }) => (
            <div key={pathname} className={location.pathname === pathname ? 'active step' : 'step'}>
              <div className="content">
                <Link to={pathname}>
                  <div className="title">{title}</div>
                  <div className="description">{description}</div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>

    <Switch style={{ flex: 1 }}>
      <Route exact path={`${match.path}`} component={MaterialInput} />
      <Route path={`${match.path}/adjust`} component={Adjust} />
      <Route path={`${match.path}/calculate`} component={Calculate} />
    </Switch>
  </div>
)
