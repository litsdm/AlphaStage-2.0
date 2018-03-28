import React, { Component } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment';
import paypal from 'paypal-checkout';
import styles from './CreateModal.scss';

import Modal from '../../Modal';
import ProgressBar from './CreatePages/ProgressBar';
import Information from './CreatePages/Information';
import Plans from './CreatePages/Plans';
import Checkout from './CreatePages/Checkout';

const plans = [
  {
    name: 'Basic',
    perks: ['2 weeks duration', 'Invite only', 'Maximum of 30 testers'],
    price: 'Free',
    duration: '2 weeks',
    description: 'This plan is great if you want to test your game with a small group or people or inside your company. You have to invite people from this session\'s page once it is created.',
    maxTesters: 30
  },
  {
    name: 'One Month',
    perks: ['1 month duration', 'Available to every one on Alpha Stage', 'Maximum of 100 testers'],
    price: '4.99',
    duration: '1 M',
    description: 'No need to invite anyone, just relax and review your feedback whenever you have time. You will also be supporting Alpha Stage\'s development :).',
    maxTesters: 100
  },
  {
    name: '1337',
    perks: ['3 month duration', 'Available to every one on Alpha Stage', 'Maximum of 400 testers', 'Spot on Alpha Stage\'s Recommended Games'],
    price: '13.37',
    duration: '3 months',
    description: 'Your game will appear in the game recommendations on the home page for every one to see. You will also be supporting Alpha Stage\'s development :).',
    maxTesters: 400
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

  onCancel = () => {
    const { id } = this.props;
    document.getElementById(id).style.display = 'none';
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  setStateProperty = (name, value) => this.setState({ [name]: value });

  validateInfo = () => {
    const { name, startDate, objectives } = this.state;

    if (!name) return { valid: false, error: 'Please enter a name for your Testing Session.' };
    if (startDate === null) return { valid: false, error: 'Please select a valid start date.' };
    if (objectives.length < 1) return { valid: false, error: 'Please enter at least one objective.' };

    return { valid: true, error: null };
  }

  nextPage = () => {
    const { progress } = this.state;

    if (progress === 0) {
      const { valid, error } = this.validateInfo();
      const errorElement = document.getElementById('errorMessage');
      errorElement.style.opacity = '0';

      if (!valid) {
        errorElement.innerHTML = error;
        errorElement.style.opacity = '1';
        return;
      }
    }

    this.setState({ progress: progress + 1 });
  }

  prevPage = () => this.setState({ progress: this.state.progress - 1 });

  resetProcess = () =>
    this.setState({
      focusedInput: null,
      name: '',
      objectives: [],
      progress: 0,
      startDate: moment(),
      selectedPlan: 0
    });

  create = () => {
    const { gameId, id, createSession } = this.props;
    const { selectedPlan, name, objectives, startDate } = this.state;
    const plan = plans[selectedPlan];
    const durationParts = plan.duration.split(' ');

    const endDate = moment(startDate).add(durationParts[0], durationParts[1]);

    const session = {
      name,
      objectives,
      startDate,
      endDate,
      plan: JSON.stringify(plan)
    };

    createSession({ ...session, game: gameId });
    document.getElementById(id).style.display = 'none';
    this.resetProcess();
  }

  renderPaypalButton = () => {
    const { selectedPlan } = this.state;
    const plan = plans[selectedPlan];
    paypal.Button.render({
      env: 'production', // sandbox | production
      style: {
        label: 'checkout',
        size: 'medium',
        shape: 'rect',
        color: 'blue',
      },
      client: {
        sandbox: 'AXWaKGPgGL-_EYRZxa1SW7MvxlzLXe-yUZ3rwQc_UdjXrczoUBHeRUyjsrt4sYq89yNtpqzL3AYYdU4k',
        production: process.env.PP_CLIENT
      },
      payment: (data, actions) => (
        actions.payment.create({
          payment: {
            transactions: [
              {
                amount: { total: plan.price, currency: 'USD' }
              }
            ]
          }
        })
      ),
      onAuthorize: (data, actions) => actions.payment.execute()
        .then(() => {
          this.create();
          return Promise.resolve();
        })
    }, '#paypal-button-container');
  }

  renderFinalButton = () => {
    const { progress, selectedPlan } = this.state;

    if (progress < 2) {
      return <button className={styles.Submit} onClick={this.nextPage}>Next</button>;
    }

    if (selectedPlan === 0) {
      return <button className={styles.Submit} onClick={this.create}>Create</button>;
    }

    this.renderPaypalButton();
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
    } else if (progress === 2) {
      return <Checkout plan={plans[selectedPlan]} />;
    }
  }

  render() {
    const { id } = this.props;
    const { progress, selectedPlan } = this.state;
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
              {this.renderFinalButton()}
              {
                plans[selectedPlan].name !== 'Basic'
                  ? <div id="paypal-button-container" />
                  : null
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
