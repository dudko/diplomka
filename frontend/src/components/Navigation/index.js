import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navigation = () => (
  <nav>
    <a 
      href='#'
      className='brand'>
      <span>Elasticity analysis</span>
    </a>
    <div
      className='menu'>
      <Link
        className='button'
        to="/">Single Material
      </Link>
      <Link
        className='button'
        to="/composite">Composite
      </Link>
    </div>
  </nav>
);

export default Navigation;
