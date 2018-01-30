import React from 'react';
import { func } from 'prop-types';
import styles from './NSButton.scss';

const NSButton = ({ switchPage }) => (
  <button className={styles.Button} onClick={switchPage}>
    Create New Session
  </button>
);

NSButton.propTypes = {
  switchPage: func.isRequired
};

export default NSButton;
