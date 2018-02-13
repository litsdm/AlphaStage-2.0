import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import uuid from 'uuid/v4';
import { func, string } from 'prop-types';
import styles from './CreateModal.scss';

import Modal from '../../Modal';


class Create extends Component {
  state = {
    endDate: null,
    focusedInput: null,
    maxTesters: 50,
    rewardType: 'Money',
    reward: '',
    startDate: null
  }

  isInputValid = () => {
    const { startDate, endDate, rewardType, reward } = this.state;

    if (startDate === null || endDate === null) {
      return { isValid: false, error: 'Both start date and end date must be selected.' };
    }
    if (rewardType !== 'No Reward' && reward === '') {
      return { isValid: false, error: 'Please input the reward that each individual will receive.' };
    }

    return { isValid: true };
  }

  onCancel = () => {
    const { id } = this.props;
    document.getElementById(id).style.display = 'none';
  }

  onSubmit = () => {
    const { gameId, id, createSession } = this.props;
    const { focusedInput, ...input } = this.state;
    const errorElement = document.getElementById('errorMessage');
    errorElement.style.display = 'none';

    const validate = this.isInputValid();

    if (!validate.isValid) {
      errorElement.innerHTML = validate.error;
      errorElement.style.display = 'block';
      return;
    }

    createSession({ ...input, game: gameId });
    document.getElementById(id).style.display = 'none';
  }

  onNumberChange = ({ target }) => {
    const { value } = target;
    const maxTesters = value ? parseInt(value, 10) : 50;
    this.setState({ maxTesters });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
    const { rewardType } = this.state;
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
            <select
              className={styles.Select}
              name="rewardType"
              onChange={this.handleChange}
            >
              <option value="Money">Money</option>
              <option value="No Reward">No Reward</option>
            </select>
          </div>
          {
            rewardType !== 'No Reward'
            ? (
              <div className={styles.InputContainer}>
                <p>Individual Reward</p>
                <input
                  type={rewardType === 'Money' ? 'number' : 'text'}
                  className={styles.Input}
                  name="reward"
                  onChange={this.handleChange}
                />
              </div>
            )
            : null
          }
          <div className={styles.Footer}>
            <p id="errorMessage" />
            <div>
              <button className={styles.Cancel} onClick={this.onCancel}>Cancel</button>
              <button className={styles.Submit} onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

Create.propTypes = {
  id: string.isRequired,
  gameId: string.isRequired,
  createSession: func.isRequired
};

export default Create;
