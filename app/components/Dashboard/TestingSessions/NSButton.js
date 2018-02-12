import React from 'react';
import { string } from 'prop-types';
import styles from './NSButton.scss';

const NSButton = ({ createId }) => {
  const openModal = () => {
    document.getElementById(createId).style.display = 'block';
  };

  return (
    <button className={styles.Button} onClick={openModal}>
      Create New Session
    </button>
  );
};

NSButton.propTypes = {
  createId: string.isRequired
};

export default NSButton;
