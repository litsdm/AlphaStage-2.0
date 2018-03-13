import React, { Component } from 'react';
import swal from 'sweetalert';
import styles from './SupportModal.scss';

import callApi from '../../helpers/apiCaller';

import Modal from '../Modal';

class SupportModal extends Component {
  state = {
    message: '',
    type: 'help'
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSend = () => {
    const { message } = this.state;

    const errorElement = document.getElementById('sErrorMessage');
    errorElement.style.opacity = '0';

    console.log(this.props);

    if (!message) {
      errorElement.style.opacity = '1';
      return;
    }

    const body = {
      ...this.state,
      ...this.props
    };

    callApi('support', body, 'POST')
      .then(() => swal('Message Sent!', 'Thank you for your message! We\'ll get back to you as soon as possible.', 'success'))
      .catch(err => console.log(err));
  }

  render() {
    const { message, type } = this.state;
    return (
      <Modal id="supportModal" title="Help & Feedback">
        <div className={styles.Content}>
          <div className={styles.Social}>
            <a href="#facebook">
              <i className="fa fa-facebook-f" />
            </a>
            <a href="#twitter">
              <i className="fa fa-twitter" />
            </a>
            <a href="#instagram">
              <i className="fa fa-instagram" />
            </a>
            <a href="#github">
              <i className="fa fa-github" />
            </a>
          </div>
          <div className={styles.Divider} />
          <div className={styles.Form}>
            <p className={styles.Title}>Leave us a message.</p>
            <div className={styles.Checkboxes}>
              <label htmlFor="supportCheck" className={`${styles.Label} ${type === 'help' ? styles.active : ''}`}>
                <input
                  id="supportCheck"
                  type="checkbox"
                  name="type"
                  value="help"
                  checked={type === 'help'}
                  onChange={this.handleChange}
                />
                <i className={`fa ${type === 'help' ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> Help
              </label>
              <label htmlFor="supportFeedback" className={`${styles.Label} ${type === 'feedback' ? styles.active : ''}`}>
                <input
                  id="supportFeedback"
                  type="checkbox"
                  name="type"
                  value="feedback"
                  checked={type === 'feedback'}
                  onChange={this.handleChange}
                />
                <i className={`fa ${type === 'feedback' ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> Feedback
              </label>
            </div>
            <textarea className={styles.Message} value={message} name="message" onChange={this.handleChange} />
          </div>
        </div>
        <div className={styles.Footer}>
          <p id="sErrorMessage">Please enter a message before sending.</p>
          <button className={styles.Send} onClick={this.handleSend}>
            Send Message
          </button>
        </div>
      </Modal>
    );
  }
}

export default SupportModal;
