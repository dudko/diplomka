import React from 'react';
import { SCHEMES } from '../constants/defaults';

const ColorScheme = ({ colorScheme, setColorScheme }) => (
  <div
    className="flex fourth"
    style={{
      alignItems: 'baseline',
    }}
  >

    <span
      className="half"
    >
      {'Color scheme:'}
    </span>
    <select
      className="half"
      onChange={event => setColorScheme(event.target.value)}
      value={colorScheme}
    >
      {SCHEMES.map(scheme =>
        <option
          key={scheme}
          value={scheme}
        >
          {scheme}
        </option>)}
    </select>
  </div>
);

export default ColorScheme;
