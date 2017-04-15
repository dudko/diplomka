import React from 'react';
import { connect } from 'react-redux';
import { crystalSystemChanged } from'../../actions';

const crystalSystems = ['unknown', 'cubic', 'hexagonal', 'triclinic',
  'orthotropic', 'trigonal', 'tetragonal', 'isotropic', 'monoclinic'];

const CrystalSystemSelect = ({ selectedCrytalSystem, dispatch }) => (
  <select
    onChange={(event) => dispatch(crystalSystemChanged(event.target.value))}
    value={selectedCrytalSystem}
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

const mapStateToProps = state => ({
  selectedCrytalSystem: state.crystalSystem
});

export default connect(mapStateToProps)(CrystalSystemSelect);
