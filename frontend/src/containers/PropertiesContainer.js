import React from 'react';
import { connect } from 'react-redux';
import Properties from '../components/Properties';
import { submitPhase } from '../actions';

const PropertiesContainer = ({ tables }) => (
  <Properties
    tables={tables}
  />
);

const mapStateToProps = (state) => ({
  tables: state.tables
})

export default connect(mapStateToProps)(PropertiesContainer);
