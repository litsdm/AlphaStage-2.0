import React, { Component } from 'react';
import { func, object } from 'prop-types';
import toastr from 'toastr';
import jwtDecode from 'jwt-decode';
import styles from './InviteDropdown.scss';

import callApi from '../../../helpers/apiCaller';

class InviteDropdown extends Component {
  state = {
    email: ''
  }

  handleEmailChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleInvite = () => {
    const { game: { _id, title }, invite } = this.props;
    const { email } = this.state;
    const token = localStorage.getItem('token');
    const { username } = jwtDecode(token);

    const body = {
      title,
      email,
      username
    };

    invite(_id, email);
    callApi('invite', body, 'POST')
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error('We couldn\'t send your invite. Please try again.'));
        }

        toastr.success('Invite sent!');
        document.getElementById('inviteEmail').value = '';
        return res;
      })
      .catch(err => {
        toastr.error(err.message);
      });
  }

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
            id="inviteEmail"
          />
          <button className={styles.Invite} onClick={this.handleInvite}>
            <i className="fa fa-paper-plane-o" /> Invite
          </button>
        </div>
      </div>
    );
  }
}

InviteDropdown.propTypes = {
  game: object,
  invite: func.isRequired
};

InviteDropdown.defaultProps = {
  game: {}
};

export default InviteDropdown;
