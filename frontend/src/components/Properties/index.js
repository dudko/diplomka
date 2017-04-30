import React from 'react';

const Properties = ({ tables }) => (
  <div>
    {tables && tables.length > 0 ?
      tables.map((table, index) => (
        <table
          key={index}
          style={{
            background: '#fff',
            margin: '20px 0'
          }}
          dangerouslySetInnerHTML={{__html: table}}
        />
      )) :
      <h5>No properties from Elate</h5>
    }
  </div>
)

export default Properties;
