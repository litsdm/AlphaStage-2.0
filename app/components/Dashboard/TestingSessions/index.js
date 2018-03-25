import React, { Component } from 'react';
import { array, string, func } from 'prop-types';

import Sessions from './Sessions';
import Empty from './Empty';
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
    const { createId, sessions, displayId, selectTest } = this.props;
    const { page, selectedIndex } = this.state;
    const session = sessions[selectedIndex];

    switch (page) {
      case 0:
        return <Sessions sessions={sessions} createId={createId} switchPage={this.switchPage} />;
      case 1:
        return <Empty createId={createId} switchPage={this.switchPage} />;
      case 2:
        return <Tests session={session} displayId={displayId} selectTest={selectTest} />;
      default:
        break;
    }
  }
}

Index.propTypes = {
  sessions: array,
  createId: string.isRequired,
  displayId: string.isRequired,
  selectTest: func.isRequired
};

Index.defaultProps = {
  sessions: []
};

export default Index;
