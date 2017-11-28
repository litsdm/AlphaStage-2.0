import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Dropdown from './Dropdown';

class Dashboard extends Component {
  state = {
    selectedIndex: 0,
    displayDropdown: false,
    tabIndex: 0
  }

  toggleDropdown = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
  }

  selectGame = (index) => () => {
    this.setState({
      selectedIndex: index,
      displayDropdown: false
    });
  }

  selectTab = (tabIndex) => () => {
    this.setState({ tabIndex });
  }

  render() {
    const { games } = this.props;
    const { selectedIndex, displayDropdown, tabIndex } = this.state;
    const selectedGame = games[selectedIndex];

    return (
      <div className={styles.Dashboard}>
        <div className={styles.Header} style={{ backgroundImage: `url(${selectedGame.coverImage})` }}>
          <div className={styles.Overlay} />
          <div className={styles.TitleContainer}>
            <p className={styles.Title}>{selectedGame.title}</p>
            <button onClick={this.toggleDropdown}>
              <i className={`fa ${displayDropdown ? 'fa-times' : 'fa-chevron-down'}`} />
            </button>
          </div>
          <Dropdown
            games={games}
            selectedIndex={selectedIndex}
            display={displayDropdown}
            selectGame={this.selectGame}
          />
          <div className={styles.Menu}>
            <button
              className={`${styles.Tab} ${tabIndex === 0 ? styles.active : ''}`}
              onClick={this.selectTab(0)}
            >
              Overview
              <div className={styles.Indicator} />
            </button>
            <button
              className={`${styles.Tab} ${tabIndex === 1 ? styles.active : ''}`}
              onClick={this.selectTab(1)}
            >
              Feedback
              <div className={styles.Indicator} />
            </button>
          </div>
          <div className={styles.ConfigButtons}>
            <button>
              <i className="fa fa-pencil" />
            </button>
            <button>
              <i className="fa fa-cog" />
            </button>
          </div>
        </div>
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
