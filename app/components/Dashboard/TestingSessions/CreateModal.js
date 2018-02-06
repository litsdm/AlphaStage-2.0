import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import uuid from 'uuid/v4';
import { string } from 'prop-types';
import styles from './CreateModal.scss';

import Modal from '../../Modal';


class Create extends Component {
  state = {
    endDate: null,
    focusedInput: null,
    maxTesters: 100,
    rewardType: '',
    reward: '',
    startDate: null
  }

  onCancel = () => {
    const { id } = this.props;
    document.getElementById(id).style.display = 'none';
  }

  onNumberChange = ({ target }) => {
    const { value } = target;
    const maxTesters = value ? parseInt(value, 10) : 50;
    this.setState({ maxTesters });
  }

  renderNumberButtons = () => {
    const { maxTesters } = this.state;
    const numbers = [50, 100, 200, 400];

    return numbers.map(number => (
      <button
        className={number === maxTesters ? styles.active : ''}
        value={number}
        onClick={this.onNumberChange}
        key={uuid()}
      >
        {number}
      </button>
      ));
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
            <p>Max Number of Testers</p>
            <div className={styles.Numbers}>
              {this.renderNumberButtons()}
              <div className={styles.Other}>
                <p>Other: </p><input onChange={this.onNumberChange} type="number" />
              </div>
            </div>
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
