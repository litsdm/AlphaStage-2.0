import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { string } from 'prop-types';
import styles from './CreateModal.scss';

import Modal from '../../Modal';


class Create extends Component {
  state = {
    endDate: null,
    focusedInput: null,
    maxTesters: 0,
    rewardType: '',
    reward: '',
    startDate: null
  }

  render() {
    const { id } = this.props;
    return (
      <Modal id={id} title="Create Testing Session">
        <div className={styles.Container}>
          <div className={styles.InputContainer}>
            <p>Duration</p>
            <DateRangePicker
              startDate={this.state.startDate}
              startDateId="sessionStart"
              endDate={this.state.endDate}
              endDateId="sessionEnd"
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
            />
          </div>
          <div className={styles.InputContainer}>
            <p>Number of Testers</p>
            <input className={styles.Input} />
          </div>
          <div className={styles.InputContainer}>
            <p>Reward Type</p>
            <select className={styles.Select} />
          </div>
          <div className={styles.InputContainer}>
            <p>Individual Reward</p>
            <input className={styles.Input} />
          </div>
          <div className={styles.Footer}>
            <button className={styles.Cancel}>Cancel</button>
            <button className={styles.Submit}>Submit</button>
          </div>
        </div>
      </Modal>
    );
  }
}

Create.propTypes = {
  id: string.isRequired
};

export default Create;
