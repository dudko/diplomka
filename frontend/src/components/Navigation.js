import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav
    style={{
      marginBottom: '20px'
    }}
  >
    <Link
      to='/'
      className='brand'
    >
      <span>Elasticity analysis</span>
    </Link>

    <div
      className='menu'
    >
      <Link
        className='button'
        to='/'
      >
        Single Material
      </Link>

      <Link
        className='button'
        to='composite'
      >
        Composite
      </Link>

      <Link
        className='button warning'
        to='/comparator'
      >
        Comparator
      </Link>

    </div>
  </nav>
);

export default Navigation;
