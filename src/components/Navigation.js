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
        Single Material
      </Link>

      <Link
        className="button"
        to="composite"
      >
        Composite
      </Link>

      <Link
        className="button warning badge"
        to="/comparator"
        data-badge={count}
      >
        Comparator
      </Link>

    </div>
  </nav>
);

const mapStateToProps = state => ({
  count: state.length,
});

export default connect(mapStateToProps)(Navigation);
