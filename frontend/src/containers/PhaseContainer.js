import React from 'react';
import { connect } from 'react-redux';
import Phase from '../components/Phase';
import { submitPhase } from '../actions';

const PhaseContainer = ({ material, submitPhase, postMessage }) => (
  <Phase
    material={material}
    submitPhase={submitPhase}
    postMessage={postMessage}
  />
);

const mapStateToProps = (state) => ({
  material: state
})

const mapDispatchToProps = dispatch => ({
  submitPhase: elasticity => dispatch(submitPhase(elasticity))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhaseContainer);
