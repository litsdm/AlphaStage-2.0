import React, { Component } from 'react';
import { object, string } from 'prop-types';
import styles from './Banner.scss';

class Banner extends Component {
  state = {
    hide: false
  }

  componentWillMount() {
    this.determineDisplay();
  }

  determineDisplay = () => {
    const { activeSession: { name } } = this.props;

    if (name === 'Basic') this.setState({ hide: true });
  }

  onHide = () => this.setState({ hide: true });

  openModal = () => {
    const { modalId } = this.props;
    document.getElementById(modalId).style.display = 'block';
  }

  render() {
    const { hide } = this.state;
    return !hide
      ? (
        <div className={styles.Banner}>
          <span>
            This game has a play testing session available.
            <span className={styles.Eligible}>
              {' '}You are eligible!
            </span>
          </span>
          <div className={styles.Buttons}>
            <button className={styles.Start} onClick={this.openModal}>Start Session</button>
            <button className={styles.Hide} onClick={this.onHide}>Hide</button>
          </div>
        </div>
      )
      : null;
  }
}

Banner.propTypes = {
  modalId: string.isRequired,
  activeSession: object
};

Banner.defaultProps = {
  activeSession: {}
};

export default Banner;
