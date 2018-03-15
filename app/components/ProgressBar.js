import React from 'react';
import { bool, number } from 'prop-types';
import styles from './ProgressBar.scss';

const ProgressBar = ({ progress, display }) => {
  const progressWidth = progress > 0 && progress <= 1 ? progress * 100 : progress;

  return (
    <div className={styles.ProgressBar} style={!display ? { display: 'none' } : {}}>
      <div className={styles.Bar}>
        <div className={styles.Fill} style={{ width: `${progressWidth}%` }} />
      </div>
      <p>{parseInt(progressWidth, 10)}%</p>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: number,
  display: bool
};

ProgressBar.defaultProps = {
  progress: 0,
  display: false
};

export default ProgressBar;
