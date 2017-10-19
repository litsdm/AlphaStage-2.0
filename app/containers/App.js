import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { Children } from 'react';

import SideBar from '../components/SideBar/SideBar';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';

import { removeUser } from '../actions/user';

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
});

class App extends Component {
  props: {
    children: Children,
    history: {},
    user: {},
    logout: Function //eslint-disable-line
  };

  render() {
    const { user, logout } = this.props;
    const isAuthorized = !_.isEmpty(user);
    return (
      <div>
        {
          isAuthorized
          ? (
            <div>
              <SideBar user={user} logout={logout} />
              <div className="content-container">
                <TopBar history={this.props.history} />
                {this.props.children}
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
