import React from 'react';

const crystalSystems = ['any', 'cubic', 'hexagonal', 'triclinic',
  'orthotropic', 'trigonal', 'tetragonal', 'isotropic', 'monoclinic'];

const CrystalSystemSelect = ({ crystalSystem, setSelectedCrystalSystem }) => (
  <select
    onChange={(event) => setSelectedCrystalSystem(event.target.value)}
    value={crystalSystem}
  >
    {crystalSystems.map(system =>
      <option
        key={system}
        value={system}
      >
        {system}
      </option>)}
  </select>
)

export default CrystalSystemSelect;