import React from 'react';
import './index.css';

export const Button = ({ onClick, children }) =>
  <button
    className='custom-btn'
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
