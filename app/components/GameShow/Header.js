import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Header = ({ coverImage, name }) => (
  <div className={styles.Header} style={{ backgroundImage: `url(${coverImage})` }}>
    <div className={styles.HeaderContent}>
      <p className={styles.Name}>{name}</p>
      <button className={styles.ButtonPlay}>
        <i className="fa fa-gamepad" /> Play
      </button>
    </div>
  </div>
);

Header.propTypes = {
  coverImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Header;
