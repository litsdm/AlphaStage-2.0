import React, { Component } from 'react';
import styles from './styles.scss';

import Login from './Login';
import Signup from './Signup';
import Info from './Info';

class Auth extends Component {
  state = {
    isNewUser: false
  }

  toggleNewUser = () => {
    this.setState({ isNewUser: !this.state.isNewUser });
  }

  render() {
    const { isNewUser } = this.state;
    return (
      <div className={styles.Auth}>
        <div className={[styles.AuthBox, isNewUser ? '' : styles.OldUser].join(' ')}>
          {
            isNewUser
            ? <Signup switchForm={this.toggleNewUser} />
            : <Login switchForm={this.toggleNewUser} />
          }
          <Info
            message={isNewUser ? 'Take a part in creating better video games!' : 'Welcome back!'}
            isNewUser={isNewUser}
          />
        </div>
      </div>
    );
  }
}


export default Auth;
