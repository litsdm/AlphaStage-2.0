import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { Children } from 'react';

import SideBar from '../components/SideBar/SideBar';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';

import { removeUser, updateProfilePic } from '../actions/user';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
  },
  updateUserPic: profilePic => dispatch(updateProfilePic(profilePic))
});

class App extends Component {
  props: {
    children: Children,
    history: {},
    user: {},
    logout: Function, //eslint-disable-line
    updateUserPic: Function //eslint-disable-line
  };

  render() {
    const { user, logout, updateUserPic } = this.props;
    const isAuthorized = !_.isEmpty(user);
    return (
      <div>
        {
          isAuthorized
          ? (
            <div>
              <SideBar user={user} logout={logout} updateUserPic={updateUserPic} />
              <div className="content-container">
                <TopBar history={this.props.history} />
                <div className="content">
                  {this.props.children}
                </div>
              </div>
            </div>
          )
          : <Auth />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
