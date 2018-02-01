import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import Overview from './Overview';
import Sessions from './TestingSessions';
import SettingsModal from './SettingsModal';
import CreateModal from './TestingSessions/CreateModal';

class Dashboard extends Component {
  state = {
    currentIndex: 0,
    displayDropdown: false,
    tabIndex: 0
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
        return <Sessions createId={`create-${currentGame._id}`} />;

      default:
        break;
    }
  }

  render() {
    const { games, updateGeneral, deleteGame } = this.props;
    const { currentIndex, displayDropdown, tabIndex } = this.state;

    const currentGame = games[currentIndex];
    const modalId = `settings-${currentGame._id}`;

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
        <CreateModal id={`create-${currentGame._id}`} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  games: PropTypes.array,
  updateGeneral: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  games: [],
  user: {}
};

export default Dashboard;
