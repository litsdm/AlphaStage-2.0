import React from 'react';
import { DateRangePicker } from 'react-dates';
import { string, func, object } from 'prop-types';
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
            <label htmlFor="allTime" className={styles.RLabel}>
              <input
                id="allTime"
                type="checkbox"
                name="type"
                value="allTime"
                checked
              />
              <i className="fa fa-circle-o" /> All the time
            </label>
          </div>
          <div className={styles.Row}>
            <label htmlFor="onTestingSession" className={styles.RLabel}>
              <input
                id="onTestingSession"
                type="checkbox"
                name="type"
                value="onTestingSession"
                checked
              />
              <i className="fa fa-circle-o" /> During testing sessions
            </label>
          </div>
          <div className={styles.Row}>
            <label htmlFor="certainDate" className={styles.RLabel}>
              <input
                id="certainDate"
                type="checkbox"
                name="type"
                value="certainDate"
                checked
              />
              <i className="fa fa-circle-o" /> During a certain date
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
            <label htmlFor="certainRelease" className={styles.RLabel}>
              <input
                id="certainRelease"
                type="checkbox"
                name="type"
                value="certainRelease"
                checked
              />
              <i className="fa fa-circle-o" /> When release status is:
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
  focusedInput: string
};

Availability.defaultProps = {
  playable: {},
  focusedInput: ''
};

export default Availability;
