import React from 'react';

const Properties = ({ tables }) => (
  <div>
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