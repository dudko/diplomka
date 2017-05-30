import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = ({ count }) => (
  <nav
    style={{
      marginBottom: '20px',
    }}
  >
    <div
      className="menu"
    >
      <Link
        className="button"
        to="/"
      >
        Enter Materials
      </Link>

      <Link
        className="button"
        to="adjust"
      >
        Adjust
      </Link>

      <Link
        className="button"
        to="calculate"
      >
        Calculate
      </Link>      
    </div>
  </nav>
);

const mapStateToProps = state => ({
  count: state.length,
});

export default connect(mapStateToProps)(Navigation);
