import React from 'react';
import { DateRangePicker } from 'react-dates';
import PropTypes, { func, object } from 'prop-types';
import styles from './styles.scss';

const Availability = ({ playable, setState, focusedInput }) => {
  const onReleaseChange = ({ target: { value } }) => {
    const newPlayable = {
      ...playable,
      certainRelease: {
        ...playable.certainRelease,
        status: value
      }
    };

    setState('playable', newPlayable);
  };

  const onDatesChange = ({ startDate, endDate }) => {
    const newPlayable = {
      ...playable,
      certainDate: {
        ...playable.certainDate,
        startDate,
        endDate
      }
    };

    setState('playable', newPlayable);
  };

  const onActiveChange = ({ target: { value, checked } }) => {
    const newPlayable = value.startsWith('certain')
      ? {
        ...playable,
        [value]: {
          ...playable[value],
          active: checked
        }
      }
      : {
        ...playable,
        [value]: checked
      };

    setState('playable', newPlayable);
  };

  const getLabelStyle = (active) => `${styles.RLabel} ${active ? styles.active : ''}`;

  const dateActive = playable.certainDate.active;
  const releaseActive = playable.certainRelease.active;

  return (
    <React.Fragment>
      <p className={styles.Title}>Availability</p>
      <div className={styles.Setting}>
        <p className={styles.STitle}>When will your game be playable?</p>
        <p className={styles.SDescription}>
          If any of these conditions are met people will be able to download and play your game.
        </p>
        <div>
          <div className={styles.Row}>
            <label htmlFor="allTime" className={getLabelStyle(playable.allTime)}>
              <input
                id="allTime"
                type="checkbox"
                value="allTime"
                checked={playable.allTime}
                onChange={onActiveChange}
              />
              <i className={`fa ${playable.allTime ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> All the time
            </label>
          </div>
          <div className={styles.Row}>
            <label htmlFor="onTestingSession" className={getLabelStyle(playable.onTestingSession)}>
              <input
                id="onTestingSession"
                type="checkbox"
                value="onTestingSession"
                checked={playable.onTestingSession}
                onChange={onActiveChange}
              />
              <i className={`fa ${playable.onTestingSession ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> During testing sessions
            </label>
          </div>
          <div className={styles.Row}>
            <label htmlFor="certainDate" className={getLabelStyle(dateActive)}>
              <input
                id="certainDate"
                type="checkbox"
                value="certainDate"
                checked={dateActive}
                onChange={onActiveChange}
              />
              <i className={`fa ${dateActive ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> During a certain date
            </label>
            <div className={styles.ROptions}>
              <DateRangePicker
                startDate={playable.certainDate.startDate}
                startDateId="availabilityStart"
                endDate={playable.certainDate.endDate}
                endDateId="availabilityEnd"
                onDatesChange={onDatesChange}
                focusedInput={focusedInput}
                onFocusChange={fInput => setState('focusedInput', fInput)}
              />
            </div>
          </div>
          <div className={styles.Row}>
            <label htmlFor="certainRelease" className={getLabelStyle(releaseActive)}>
              <input
                id="certainRelease"
                type="checkbox"
                name="type"
                value="certainRelease"
                checked={releaseActive}
                onChange={onActiveChange}
              />
              <i className={`fa ${releaseActive ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> When release status is:
            </label>
            <div className={styles.ROptions}>
              <select className={styles.Select} onChange={onReleaseChange}>
                <option>Released</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Availability.propTypes = {
  playable: object,
  setState: func.isRequired,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate'])
};

Availability.defaultProps = {
  playable: {},
  focusedInput: null
};

export default Availability;
