import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navigation = () => (
  <div
    className='navigation'
  >
    <h1>Elasticity analysis</h1>
    <ul>
      <li><Link to="/">Single Material</Link></li>
      <li><Link to="/composite">Composite</Link></li>
    </ul>
    <hr/>
  </div>
);

export default Navigation;
