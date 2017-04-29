import React from 'react';

const Button = ({ onClick, children, className }) => (
  <button
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
