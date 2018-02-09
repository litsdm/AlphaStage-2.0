import React from 'react';
import styles from './Banner.scss';

const Banner = () => (
  <div className={styles.Banner}>
    <span>
      This game has a play testing session available.
      <span className={styles.Eligible}>
        {' '}You are eligible!
      </span>
    </span>
    <div className={styles.Buttons}>
      <button className={styles.Start}>Start Session</button>
      <button className={styles.Hide}>Hide</button>
    </div>
  </div>
);

export default Banner;
