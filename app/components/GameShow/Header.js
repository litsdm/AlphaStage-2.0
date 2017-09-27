import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Header = ({ coverImage }) => (
  <div className={styles.Header} style={{ backgroundImage: `url(${coverImage})` }}>
    <div className={styles.HeaderContent}>
      <button className={styles.ButtonPlay}>
        <i className="fa fa-gamepad" /> Play
      </button>
    </div>
  </div>
);

Header.propTypes = {
  coverImage: PropTypes.string.isRequired
};

export default Header;
