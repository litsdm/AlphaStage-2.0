import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SettingsModal.scss';

import Modal from '../Modal';

class SettingsModal extends Component {
  state = {
    contentIndex: 0
  }

  changeContent = (contentIndex) => () => this.setState({ contentIndex });

  render() {
    const { id } = this.props;

    return (
      <Modal isSettings id={id}>
        <div className={styles.Container}>
          <div className={styles.Menu}>
            <button onClick={this.changeContent(0)}>
              General
            </button>
            <button className={styles.DeleteButton}>
              Delete
            </button>
          </div>
          <div className={styles.Content}>
            <p>Content 0</p>
          </div>
        </div>
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  id: PropTypes.string
};

SettingsModal.defaultProps = {
  id: ''
};

export default SettingsModal;
