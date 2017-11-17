import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.scss';

const Modal = ({ title, isGallery, children }) => {
  window.onclick = ({ target }) => {
    if (target.id === 'modal') closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
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
    <div id="modal" className={styles.Modal}>
      <div className={styles.Content} style={isGallery ? { padding: '0', background: 'none' } : {}}>
        {title ? renderHeader() : null}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isGallery: PropTypes.bool
};

Modal.defaultProps = {
  title: '',
  isGallery: false
};

export default Modal;
