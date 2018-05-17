import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import jwtDecode from 'jwt-decode';
import styles from './styles.scss';

import Login from './Login';
import Signup from './Signup';
import NoAccess from './NoAccess';
import Info from './Info';
import Controls from '../Controls';

import { addUser } from '../../actions/user';

const mapDispatchToProps = dispatch => ({
  addUserFromToken: token => dispatch(addUser(jwtDecode(token))),
});

class Auth extends Component {
  state = {
    page: 0
  }

  switchPage = (page) => this.setState({ page });

  renderPage = () => {
    const { addUserFromToken } = this.props;
    const { page } = this.state;
    switch (page) {
      case 0:
        return <Signup switchPage={this.switchPage} addUser={addUserFromToken} />;
      case 1:
        return <Login switchPage={this.switchPage} addUser={addUserFromToken} />;
      case 2:
        return <NoAccess switchPage={this.switchPage} />;
      default:
        break;
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div className={styles.Auth}>
        <Controls />
        <div className={styles.Draggable} />
        <div className={[styles.AuthBox, page === 0 ? '' : styles.OldUser].join(' ')}>
          {this.renderPage()}
          <Info
            message={page === 0 ? 'Take your game to the next level!' : 'Welcome back!'}
            page={page}
          />
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  addUserFromToken: func.isRequired
};

export default connect(null, mapDispatchToProps)(Auth);
