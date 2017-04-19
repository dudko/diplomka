import React from 'react';

const Properties = ({ tables }) => (
  <div>
    {tables ?
      tables.map((table, index) => (
        <table key={index} dangerouslySetInnerHTML={{__html: table}} />
      )) :
      <h5>No properties</h5>
    }
  </div>
)

export default Properties;
