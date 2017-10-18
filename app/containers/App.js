// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';

export default class App extends Component {
  props: {
    children: Children,
    history: {}
  };

  state = {
    isAuthorized: localStorage.getItem('token')
  }

  render() {
    const { isAuthorized } = this.state;
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
