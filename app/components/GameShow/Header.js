import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';

const Header = ({ coverImage }) => {
  const openModal = () => {
    document.getElementById('modal').style.display = 'block';
  };

  return (
    <div
      className={styles.Header}
      style={{ backgroundImage: `url(${coverImage})` }}
      onClick={openModal}
      role="button"
      tabIndex="-1"
    >
      <button className={styles.ButtonPlay}>
        <i className="fa fa-play-circle-o" />
      </button>
      <div className={styles.Overlay} />
    </div>
  );
};

Header.propTypes = {
  coverImage: PropTypes.string.isRequired
};

export default Header;
