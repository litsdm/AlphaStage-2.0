import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import styles from './styles.scss';

import Login from './Login';
import Signup from './Signup';
import Info from './Info';
import Controls from '../Controls';

import { addUser } from '../../actions/user';

const mapDispatchToProps = dispatch => ({
  addUserFromToken: token => dispatch(addUser(jwtDecode(token))),
});

class Auth extends Component {
  state = {
    isNewUser: false
  }

  toggleNewUser = () => {
    this.setState({ isNewUser: !this.state.isNewUser });
  }

  render() {
    const { addUserFromToken } = this.props;
    const { isNewUser } = this.state;
    return (
      <div className={styles.Auth}>
        <Controls />
        <div className={styles.Draggable} />
        <div className={[styles.AuthBox, isNewUser ? '' : styles.OldUser].join(' ')}>
          {
            isNewUser
            ? <Signup switchForm={this.toggleNewUser} addUser={addUserFromToken} />
            : <Login switchForm={this.toggleNewUser} addUser={addUserFromToken} />
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

Auth.propTypes = {
  addUserFromToken: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Auth);
