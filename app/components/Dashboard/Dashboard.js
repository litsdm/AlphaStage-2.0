import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';

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

  render() {
    const { games } = this.props;
    const { currentIndex, displayDropdown, tabIndex } = this.state;

    return (
      <div className={styles.Dashboard}>
        <Header
          games={games}
          currentIndex={currentIndex}
          displayDropdown={displayDropdown}
          tabIndex={tabIndex}
          toggleDropdown={this.toggleDropdown}
          selectGame={this.selectGame}
          selectTab={this.selectTab}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  games: PropTypes.array
};

Dashboard.defaultProps = {
  games: []
};

export default Dashboard;
