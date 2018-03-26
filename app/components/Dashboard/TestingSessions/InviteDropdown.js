import React, { Component } from 'react';
import styles from './InviteDropdown.scss';

class InviteDropdown extends Component {
  state = {
    email: ''
  }

  handleEmailChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const { email } = this.state;

    return (
      <div className={styles.InviteDropdown} id="inviteDropdown" style={{ display: 'none' }}>
        <div className={styles.ArrowBox}>
          <p className={styles.Title}>Enter email</p>
          <p className={styles.Description}>
            It is not necessary for the user to have an Alpha Stage account already.
            {' '}The game will be available when he creates an account with the email below.
          </p>
          <input
            className={styles.Input}
            type="email"
            value={email}
            onChange={this.handleEmailChange}
            name="email"
          />
          <button className={styles.Invite}>
            <i className="fa fa-paper-plane-o" /> Invite
          </button>
        </div>
      </div>
    );
  }
}

export default InviteDropdown;
