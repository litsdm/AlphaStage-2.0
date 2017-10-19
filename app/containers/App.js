// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { Children } from 'react';

import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

class App extends Component {
  props: {
    children: Children,
    history: {},
    user: {}
  };

  render() {
    const { user } = this.props;
    const isAuthorized = !_.isEmpty(user);
    return (
      <div>
        {
          isAuthorized
          ? (
            <div>
              <SideBar />
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

export default connect(mapStateToProps, null)(App);
