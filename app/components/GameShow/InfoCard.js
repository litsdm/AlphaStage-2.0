import React from 'react';
import styles from './InfoCard.scss';

const InfoCard = () => (
  <div className={styles.Info}>
    <div className={styles.Header}>
      <button className={styles.ButtonPlay}>
        <i className="fa fa-gamepad" /> Play
      </button>
    </div>
  </div>
);

export default InfoCard;
