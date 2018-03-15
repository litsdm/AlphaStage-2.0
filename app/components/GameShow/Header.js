import React from 'react';
import { string } from 'prop-types';
import styles from './Header.scss';

const Header = ({ coverImage, modalId }) => {
  const openModal = () => {
    document.getElementById(modalId).style.display = 'block';
  };

  return (
    <div
      className={styles.Header}
      style={{ backgroundImage: `url(${coverImage})` }}
      onClick={openModal}
      role="button"
      tabIndex="-1"
      onKeyUp={() => {}}
    >
      <button className={styles.ButtonPlay}>
        <i className="fa fa-play-circle-o" />
      </button>
      <div className={styles.Overlay} />
    </div>
  );
};

Header.propTypes = {
  coverImage: string.isRequired,
  modalId: string.isRequired
};

export default Header;
