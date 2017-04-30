import React from 'react';

const availableColorSchemes = [ 'pairs', 'Greys', 'Greens', 'Bluered',
  'Hot', 'Picnic', 'Portland', 'Jet', 'RdBu', 'Blackbody', 'Earth',
  'Electric', 'YIOrRd', 'YIGnBu'
]

const ColorScheme = ({ colorScheme, setColorScheme }) => (
  <div
    className='flex fourth'
    style={{
      alignItems: 'baseline'
    }}
  >
    
    <span
      className='half'
    >
      {'Color scheme:'}
    </span>
    <select
      className='half'
      onChange={(event) => setColorScheme(event.target.value)}
      value={colorScheme}
    >
      {availableColorSchemes.map(scheme =>
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