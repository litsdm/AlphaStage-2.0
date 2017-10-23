import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Menu.scss';

const Menu = ({ location }) => {
  const getClassName = (path) => (
    location.pathname === path ? [styles.Item, styles.active].join(' ') : styles.Item
  );

  return (
    <div className={styles.Menu}>
      <Link to="/" className={getClassName('/')}>
        <div className={styles.Indicator} />
        Browse
      </Link>
    </div>
  );
};

Menu.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Menu);
