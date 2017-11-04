import React from 'react';
import PropTypes from 'prop-types';
import styles from './InfoCard.scss';

const InfoCard = ({ game }) => (
  <div className={styles.Info}>
    <div className={styles.Header}>
      <button className={styles.ButtonPlay}>
        <i className="fa fa-gamepad" /> Play
      </button>
    </div>
    <div className={styles.Body}>
      <div className={styles.Row}>
        <p className={styles.Subtitle}>Release Status: </p>
        <p className={styles.Subvalue}>{game.releaseStatus}</p>
      </div>
    </div>
  </div>
);

InfoCard.propTypes = {
  game: PropTypes.object.isRequired
};

export default InfoCard;
