import React, { Component } from 'react';
import { array, string } from 'prop-types';

import Sessions from './Sessions';
import Empty from './Empty';
import Show from './Show';

class Index extends Component {
  state = {
    page: this.props.sessions.length > 0 ? 0 : 1
  };

  switchPage = (page) => {
    this.setState({ page });
  }

  render() {
    const { createId } = this.props;
    const { page } = this.state;

    switch (page) {
      case 0:
        return <Sessions createId={createId} switchPage={this.switchPage} />;
      case 1:
        return <Empty createId={createId} switchPage={this.switchPage} />;
      case 2:
        return <Show switchPage={this.switchPage} />;
      default:
        break;
    }
  }
}

Index.propTypes = {
  sessions: array,
  createId: string.isRequired
};

Index.defaultProps = {
  sessions: []
};

export default Index;
