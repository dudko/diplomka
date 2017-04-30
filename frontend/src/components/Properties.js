import React from 'react';

const Properties = ({ tables }) => (
  <div>
    <h3>Results from Elate</h3>
    {tables.length > 0 &&
      tables.map((table, index) => (
        <table
          key={index}
          style={{
            background: '#fff',
            margin: '20px 0'
          }}
          dangerouslySetInnerHTML={{__html: table}}
        />
      ))}
  </div>
)

export default Properties;