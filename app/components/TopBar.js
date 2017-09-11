// @flow
import React from 'react';
import styles from './TopBar.scss';

const TopBar = () => {
  const handlePrevious = () => {
    // go back to prev page
  };

  return (
    <div className={styles.TopBar}>
      <button className={styles.PrevButton} onClick={handlePrevious}>
        <i className="fa fa-chevron-left fa-2x" />
      </button>
    </div>
  );
};

export default TopBar;
