import React, { Component } from 'react';
import { array, string } from 'prop-types';

import Sessions from './Sessions';
import Empty from './Empty';
import Show from './Show';
import Tests from './Tests';

class Index extends Component {
  state = {
    page: this.props.sessions.length > 0 ? 0 : 1,
    selectedIndex: 0
  };

  switchPage = (page, selectedIndex = 0) => {
    this.setState({ page, selectedIndex });
  }

  render() {
    const { createId, sessions } = this.props;
    const { page, selectedIndex } = this.state;
    const session = sessions[selectedIndex];

    switch (page) {
      case 0:
        return <Sessions sessions={sessions} createId={createId} switchPage={this.switchPage} />;
      case 1:
        return <Empty createId={createId} switchPage={this.switchPage} />;
      case 2:
        return <Show switchPage={this.switchPage} />;
      case 3:
        return <Tests session={session} />;
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
