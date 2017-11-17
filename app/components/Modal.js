import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.scss';

const Modal = ({ title, isGallery, children, id }) => {
  window.onclick = ({ target }) => {
    if (target.id === id) closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById(id);
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
    <div id={id} className={styles.Modal}>
      <div className={styles.Content} style={isGallery ? { padding: '0', background: 'none' } : {}}>
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
  isGallery: PropTypes.bool
};

Modal.defaultProps = {
  title: '',
  isGallery: false
};

export default Modal;
