import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import styles from './SettingsModal.scss';

import Modal from '../Modal';
import General from './SettingsViews/General';

class SettingsModal extends Component {
  state = {
    contentIndex: 0,
    privacyCheck: this.props.game.isPrivate,
    releaseStatus: this.props.game.releaseStatus
  }

  changeContent = (contentIndex) => () => this.setState({ contentIndex });

  changeInput = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value }, () => {
      this.saveSettings();
    });
  }

  saveSettings = () => {
    const { game, updateGeneral } = this.props;
    const { privacyCheck, releaseStatus } = this.state;

    updateGeneral(game._id, privacyCheck, releaseStatus);
  }

  checkDelete = () => {
    const { id, game, userId, removeDeveloperRef } = this.props;
    swal({
      text: `Deleting your game is irreversible. Enter your game's name (${game.title}) to confirm that you want to permanently delete it.`,
      icon: 'warning',
      content: 'input',
      dangerMode: true,
      buttons: {
        cancel: 'Go back',
        confirm: {
          text: 'Delete'
        }
      }
    })
    .then(title => {
      if (!title) return;
      if (title !== game.title) return;

      removeDeveloperRef(game._id, userId);
      document.getElementById(id).style.display = 'none';

      return title;
    })
    .catch(err => console.log(err));
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
        releaseStatus={releaseStatus || ''}
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
            <button className={styles.DeleteButton} onClick={this.checkDelete}>
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
  id: PropTypes.string,
  game: PropTypes.object.isRequired,
  userId: PropTypes.string,
  updateGeneral: PropTypes.func.isRequired,
  removeDeveloperRef: PropTypes.func.isRequired
};

SettingsModal.defaultProps = {
  id: '',
  userId: ''
};

export default SettingsModal;