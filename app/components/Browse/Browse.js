import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

import TopSlider from './TopSlider';

import type { Game } from '../../types/dataTypes';

const categories = [
  'Action', 'Adventure', 'Alpha', 'Beta', 'Demos', 'Indie', 'Prototypes', 'RPG',
  'Simulation', 'Sports'
];

class Browse extends Component {
  props: {
    games: [Game]
  }

  renderCategories = () => (
    categories.map(category => (
      <Link to="/" className={styles.Category}>
        <i className="fa fa-gamepad" />
        <p>{category}</p>
      </Link>
    ))
  );

  render() {
    return (
      <div>
        <TopSlider games={this.props.games} />
        <div className={styles.Wrapper}>
          <p className={styles.Title}>Categories</p>
          <div className={styles.Divider} />
          <div className={styles.Grid}>
            {this.renderCategories()}
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;
