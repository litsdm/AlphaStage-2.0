import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SettingsModal.scss';

import Modal from '../Modal';

class SettingsModal extends Component {
  state = {
    contentIndex: 0
  }

  changeContent = (contentIndex) => () => this.setState({ contentIndex });

  activeClass = (index) => (
    index === this.state.contentIndex
      ? styles.active
      : ''
  )

  render() {
    const { id } = this.props;

    return (
      <Modal isSettings id={id}>
        <div className={styles.Container}>
          <div className={styles.Menu}>
            <button className={this.activeClass(0)} onClick={this.changeContent(0)}>
              General
            </button>
            <div className={styles.Divider} />
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
