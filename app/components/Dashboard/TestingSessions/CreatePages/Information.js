import React from 'react';
import { SingleDatePicker } from 'react-dates';
import { array, bool, func, object } from 'prop-types';
import styles from './Information.scss';

import Objectives from '../Objectives';

const Information = ({ date, focusedInput, setState, objectives, handleChange }) => (
  <React.Fragment>
    <div className={styles.InputContainer}>
      <p>Name</p>
      <input
        type="text"
        className={styles.Input}
        name="name"
        onChange={handleChange}
      />
    </div>
    <div className={styles.InputContainer}>
      <p>Duration</p>
      <SingleDatePicker
        date={date}
        onDateChange={newDate => setState('startDate', newDate)}
        focused={focusedInput}
        onFocusChange={({ focused }) => setState('focusedInput', focused)}
      />
    </div>
    <div className={styles.InputContainer}>
      <p>Objectives</p>
      <Objectives objectives={objectives} handleChange={handleChange} />
    </div>
  </React.Fragment>
);

Information.propTypes = {
  date: object.isRequired,
  focusedInput: bool,
  setState: func.isRequired,
  handleChange: func.isRequired,
  objectives: array
};

Information.defaultProps = {
  focusedInput: false,
  objectives: []
};

export default Information;
