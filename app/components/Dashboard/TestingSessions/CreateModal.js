import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { func, string } from 'prop-types';
import moment from 'moment';
import styles from './CreateModal.scss';

import Modal from '../../Modal';
import ProgressBar from './CreatePages/ProgressBar';
import Information from './CreatePages/Information';
import Plans from './CreatePages/Plans';

const plans = [
  {
    name: 'Basic',
    perks: ['2 weeks duration', 'Invite only', 'Maximum of 30 testers'],
    price: 'Free'
  },
  {
    name: 'One Month',
    perks: ['1 month duration', 'Available to every one on Alpha Stage', 'Maximum of 150 testers'],
    price: '4.99'
  },
  {
    name: 'Three Months',
    perks: ['3 month duration', 'Available to every one on Alpha Stage', 'Maximum of 400 testers', 'Spot on Alpha Stage\'s top Games'],
    price: '9.99'
  }
];

class Create extends Component {
  state = {
    focusedInput: null,
    name: '',
    objectives: [],
    progress: 0,
    startDate: moment(),
    selectedPlan: 0
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

  setStateProperty = (name, value) => this.setState({ [name]: value });

  nextPage = () => this.setState({ progress: this.state.progress + 1 });
  prevPage = () => this.setState({ progress: this.state.progress - 1 });

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

  renderPage = () => {
    const { objectives, startDate, focusedInput, progress, selectedPlan } = this.state;

    if (progress === 0) {
      return (
        <Information
          date={startDate}
          focusedInput={focusedInput}
          objectives={objectives}
          handleChange={this.handleChange}
          setState={this.setStateProperty}
        />
      );
    } else if (progress === 1) {
      return <Plans plans={plans} selectedPlan={selectedPlan} setState={this.setStateProperty} />;
    }
  }

  render() {
    const { id } = this.props;
    const { progress } = this.state;
    return (
      <Modal id={id} title="Create Testing Session">
        <div className={styles.Container}>
          <ProgressBar progress={progress} />
          {this.renderPage()}
          <div className={styles.Footer}>
            <p id="errorMessage" />
            <div>
              <button className={styles.Cancel} onClick={this.onCancel}>Cancel</button>
              {
                progress === 0
                  ? null
                  : <button className={styles.PrevButton} onClick={this.prevPage}>Back</button>
              }
              {
                progress === 2
                  ? <button className={styles.Submit} onClick={this.onSubmit}>Submit</button>
                  : <button className={styles.Submit} onClick={this.nextPage}>Next</button>
              }
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
