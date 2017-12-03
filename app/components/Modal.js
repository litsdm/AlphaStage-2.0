import React from 'react';
import PropTypes from 'prop-types';
import YTPlayer from 'youtube-player';
import styles from './Modal.scss';

const Modal = ({ title, isGallery, isSettings, trailerId, children, id }) => {
  window.onclick = ({ target }) => {
    if (target.id === id) closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById(id);
    if (trailerId) stopVideo();
    modal.style.display = 'none';
  };

  let player;
  const stopVideo = () => {
    if (!player) player = YTPlayer(trailerId);
    player.stopVideo();
  };

  const renderHeader = () => (
    <div className={styles.Header}>
      <button className={styles.ButtonClose} onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
      <p className={styles.Title}>{title}</p>
    </div>
  );

  const renderSettingsHeader = () => (
    <div className={styles.SettingsHeader}>
      <div className={styles.SettingsTitle}>
        <p>Settings</p>
      </div>
      <button className={styles.ButtonClose} onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
    </div>
  );

  const galleryStyles = (
    isGallery
      ? { padding: '30px', borderRadius: '4px' }
      : {}
  );

  const settingsStyles = (
    isSettings
      ? { paddingLeft: '0', width: '75%' }
      : {}
  );

  return (
    <div id={id} className={styles.Modal}>
      <div className={styles.Content} style={{ ...galleryStyles, ...settingsStyles }}>
        {title ? renderHeader() : null}
        {isSettings ? renderSettingsHeader() : null}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  isGallery: PropTypes.bool,
  isSettings: PropTypes.bool,
  trailerId: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
  isGallery: false,
  isSettings: false,
  trailerId: ''
};

export default Modal;
