import React from 'react';
import PropTypes from 'prop-types';
import YTPlayer from 'youtube-player';
import styles from './Modal.scss';

let player;

const Modal = ({ title, isGallery, trailerId, children, id }) => {
  window.onclick = ({ target }) => {
    if (target.id === id) closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById(id);
    if (trailerId) stopVideo();
    modal.style.display = 'none';
  };

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

  return (
    <div id={id} className={styles.Modal}>
      <div className={styles.Content} style={isGallery ? { padding: '30px', borderRadius: '4px' } : {}}>
        {title ? renderHeader() : null}
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
  trailerId: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
  isGallery: false,
  trailerId: ''
};

export default Modal;
