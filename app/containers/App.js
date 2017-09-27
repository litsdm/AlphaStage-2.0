// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <SideBar />
        <div className="content-container">
          <TopBar history={this.props.history} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
