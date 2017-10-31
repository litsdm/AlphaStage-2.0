import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Header = ({ coverImage, title }) => (
  <div className={styles.Header} style={{ backgroundImage: `url(${coverImage})` }}>
    <div className={styles.HeaderContent}>
      <p className={styles.Title}>{title}</p>
      <button className={styles.ButtonPlay}>
        <i className="fa fa-gamepad" /> Play
      </button>
    </div>
  </div>
);

Header.propTypes = {
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Header;
