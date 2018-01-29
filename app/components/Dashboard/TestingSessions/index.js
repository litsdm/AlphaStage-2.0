import React, { Component } from 'react';

import Sessions from './Sessions';
import Empty from './Empty';
import Create from './Create';

class Index extends Component {
  state = {
    page: 0
  };

  switchPage(page) {
    this.setState({ page });
  }

  render() {
    const { page } = this.state;

    switch (page) {
      case 0:
        return <Sessions />;
      case 1:
        return <Empty />;
      case 2:
        return <Create />;
      default:
        break;
    }
  }
}

export default Index;
