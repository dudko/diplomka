import React from 'react';
// import './index.css'

const Properties = ({ tables }) => (
  <div
    className='properties'
  >
    {tables ?
      tables.map((table, index) => (
        <table key={index} dangerouslySetInnerHTML={{__html: table}} />
      )) :
      <h5>No properties from Elate</h5>
    }
  </div>
)

export default Properties;
