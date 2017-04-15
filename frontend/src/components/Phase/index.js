import React, { Component } from 'react';
import Matrix from '../Matrix';
import CrystalSystemSelect from '../../containers/CrystalSystemSelect';
import MaterialProjectSearch from '../MaterialProjectSearch';
import Button from '../Button';

function submitPhase(elasticity) {
  
}

export default class Phase extends Component {
  render() {
    return (
      <form>
        <CrystalSystemSelect />
        <Matrix
          rowCount={6}
          columnCount={6}
        />
        <MaterialProjectSearch />
        <Button
          onClick={submitPhase}
        >
          Submit
        </Button>
      </form>
    )
  }
}
