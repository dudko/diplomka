import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const NoMaterialAdded = ({ push }) => (
  <div
    style={{
      display: 'flex',
      minHeight: '300px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h3 className="ui header">Add materials first.</h3>
    <div className="ui green inverted button" onClick={() => push('/input')}>
      <i className="edit icon" /> Input
    </div>
  </div>
)

export default connect(null, { push })(NoMaterialAdded)
