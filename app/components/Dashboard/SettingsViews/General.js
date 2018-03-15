import React from 'react';
import { bool, func, string } from 'prop-types';
import uuid from 'uuid/v4';
import styles from './styles.scss';

const releaseOptions = [
  'Released - Game is ready.',
  'Beta - Some aspects of the game need polishing.',
  'Alpha - Some of the main features are yet to be added.',
  'Demo - Only a level or small part of the game.',
  'Prototype - Just testing out an idea.'
];

const General = ({ privacyCheck, releaseStatus, handleChange }) => {
  const renderOptions = () => (
    releaseOptions.map(value => <option value={value} key={uuid()}>{value}</option>)
  );

  return (
    <React.Fragment>
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
      <div className={styles.Setting}>
        <p className={styles.STitle}>Release Status</p>
        <select
          id="releaseStatus"
          name="releaseStatus"
          className={styles.Select}
          onChange={handleChange}
          value={releaseStatus}
        >
          {renderOptions()}
        </select>
      </div>
    </React.Fragment>
  );
};

General.propTypes = {
  privacyCheck: bool,
  releaseStatus: string,
  handleChange: func.isRequired
};

General.defaultProps = {
  privacyCheck: true,
  releaseStatus: ''
};

export default General;
