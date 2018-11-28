import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const InvalidFractionModal = ({ push }) => (
  <div className="ui active page dimmer">
    <div className="ui tiny active modal">
      <div className="ui header">
        <i className="warning circle icon" />
        <div className="content">Sum of material fractions must be 1</div>
      </div>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iure
          quos cupiditate, amet maxime similique hic quasi beatae possimus
          aperiam illum enim quisquam numquam quibusdam neque! Quidem reiciendis
          error porro!
        </p>
      </div>
      <div className="actions">
        <div
          className="ui green inverted button"
          onClick={() => push('/tool/adjust')}
        >
          <i className="settings icon" /> Adjust
        </div>
      </div>
    </div>
  </div>
)

export default connect(null, { push })(InvalidFractionModal)
