import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ count }) => (
  <div style={{
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#efefef"
  }}
  >
    <div
      className="flex two"
    >
      <div>
        <ul
          style={{
            listStyle: "none",
            fontSize: "0.83em",
            margin: 0,
            padding: '10px',
          }}
        >
          <li><a>Institute of Physics of Materials</a></li>
          <li><a>CERIT SC</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
