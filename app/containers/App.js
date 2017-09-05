// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import SideBar from '../components/SideBar';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <SideBar />
        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
