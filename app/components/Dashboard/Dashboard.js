import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Dropdown from './Dropdown';

class Dashboard extends Component {
  state = {
    selectedIndex: 0
  }

  render() {
    const { games } = this.props;
    const { selectedIndex } = this.state;
    const selectedGame = games[selectedIndex];

    return (
      <div className={styles.Dashboard}>
        <div className={styles.Header} style={{ backgroundImage: `url(${selectedGame.coverImage})` }}>
          <div className={styles.Overlay} />
          <div className={styles.TitleContainer}>
            <p className={styles.Title}>{selectedGame.title}</p>
            <button>
              <i className="fa fa-angle-down" />
            </button>
          </div>
          <Dropdown games={games} selectedIndex={selectedIndex} />
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
