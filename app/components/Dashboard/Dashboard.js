import React, { Component } from 'react';
import { array, func } from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import Overview from './Overview';
import Sessions from './TestingSessions';
import SettingsModal from './SettingsModal';
import CreateModal from './TestingSessions/CreateModal';
import DisplayFeedbackModal from './TestingSessions/DisplayFeedbackModal';

class Dashboard extends Component {
  state = {
    currentIndex: 0,
    displayDropdown: false,
    tabIndex: 0,
    selectedTest: null
  }

  toggleDropdown = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
  }

  selectGame = (index) => () => {
    this.setState({
      currentIndex: index,
      displayDropdown: false
    });
  }

  selectTab = (tabIndex) => () => {
    this.setState({ tabIndex });
  }

  selectTest = (selectedTest, cb) => this.setState({ selectedTest }, cb)

  renderPage() {
    const { games } = this.props;
    const { tabIndex, currentIndex } = this.state;

    const currentGame = games[currentIndex];
    const { downloads, pageViews, plays, uninstalls } = currentGame;

    switch (tabIndex) {
      case 0:
        return (
          <Overview
            downloads={downloads || undefined}
            pageViews={pageViews || undefined}
            plays={plays || undefined}
            uninstalls={uninstalls || undefined}
          />
        );
      case 1:
        return (
          <Sessions
            sessions={currentGame.testingSessions}
            createId={`create-${currentGame._id}`}
            displayId={`display-${currentGame._id}`}
            selectTest={this.selectTest}
          />
        );

      default:
        break;
    }
  }

  render() {
    const { games, updateGeneral, deleteGame, createTestingSession } = this.props;
    const { currentIndex, displayDropdown, tabIndex, selectedTest } = this.state;

    const currentGame = games[currentIndex];
    const modalId = `settings-${currentGame._id}`;
    const displayId = `display-${currentGame._id}`;

    return (
      <div className={styles.Dashboard}>
        <Header
          games={games}
          currentIndex={currentIndex}
          currentGame={currentGame}
          displayDropdown={displayDropdown}
          modalId={modalId}
          tabIndex={tabIndex}
          toggleDropdown={this.toggleDropdown}
          selectGame={this.selectGame}
          selectTab={this.selectTab}
        />
        {this.renderPage()}
        <SettingsModal
          id={modalId}
          game={currentGame}
          updateGeneral={updateGeneral}
          deleteGame={deleteGame}
        />
        <CreateModal
          gameId={currentGame._id}
          createSession={createTestingSession}
          id={`create-${currentGame._id}`}
        />
        <DisplayFeedbackModal id={displayId} {...selectedTest} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  games: array,
  updateGeneral: func.isRequired,
  deleteGame: func.isRequired,
  createTestingSession: func.isRequired
};

Dashboard.defaultProps = {
  games: []
};

export default Dashboard;
