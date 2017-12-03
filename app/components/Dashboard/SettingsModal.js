import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SettingsModal.scss';

import Modal from '../Modal';
import General from './SettingsViews/General';

class SettingsModal extends Component {
  state = {
    contentIndex: 0,
    privacyCheck: true,
    releaseStatus: ''
  }

  changeContent = (contentIndex) => () => this.setState({ contentIndex });

  changeInput = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  activeClass = (index) => (
    index === this.state.contentIndex
      ? styles.active
      : ''
  )

  getContent = () => {
    const { privacyCheck, releaseStatus } = this.state;
    return [
      <General
        releaseStatus={releaseStatus}
        privacyCheck={privacyCheck}
        handleChange={this.changeInput}
      />
    ];
  }

  render() {
    const { id } = this.props;
    const { contentIndex } = this.state;
    const content = this.getContent();

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
            {content[contentIndex]}
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
