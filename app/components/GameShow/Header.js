import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';

const Header = ({ coverImage }) => (
  <div className={styles.Header} style={{ backgroundImage: `url(${coverImage})` }}>
    <button className={styles.ButtonPlay}>
      <i className="fa fa-play-circle-o" />
    </button>
    <div className={styles.Overlay} />
  </div>
);

Header.propTypes = {
  coverImage: PropTypes.string.isRequired
};

export default Header;
