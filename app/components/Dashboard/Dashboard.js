import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

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
          <p className={styles.Title}>{selectedGame.title}</p>
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
