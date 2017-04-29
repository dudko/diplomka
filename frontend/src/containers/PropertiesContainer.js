import React from 'react';
import { connect } from 'react-redux';
import Properties from '../components/Properties';

const PropertiesContainer = ({ tables }) => (
  <Properties
    tables={tables}
  />
);

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(PropertiesContainer);
