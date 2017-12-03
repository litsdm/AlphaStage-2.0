import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const General = ({ privacyCheck, handleChange }) => (
  <div>
    <p className={styles.Title}>General</p>
    <div className={styles.Setting}>
      <p className={styles.STitle}>Availability</p>
      <div className={styles.SliderContainer}>
        <label className={`${styles.Lock} ${privacyCheck ? '' : styles.active}`} htmlFor="privacySwitch">
          <i className="fa fa-lock" />
          <p>Invite Only</p>
        </label>
        <label htmlFor="privacySwitch" className={styles.Switch}>
          <input
            id="privacySwitch"
            name="privacyCheck"
            type="checkbox"
            checked={privacyCheck}
            onChange={handleChange}
          />
          <span className={styles.Slider} />
        </label>
        <label className={`${styles.Globe} ${privacyCheck ? styles.active : ''}`} htmlFor="privacySwitch">
          <i className="fa fa-globe" />
          <p>Open to Everyone</p>
        </label>
      </div>
    </div>
  </div>
);

General.propTypes = {
  privacyCheck: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};

General.defaultProps = {
  privacyCheck: true
};

export default General;
