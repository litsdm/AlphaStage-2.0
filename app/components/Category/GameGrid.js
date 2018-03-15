import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { array } from 'prop-types';
import styles from './GameGrid.scss';

const GameGrid = ({ games }) => {
  const renderGames = () => games.map(game => (
    <Link to={`/games/${game._id}`} key={uuid()}>
      <img className={styles.Thumbnail} alt="Game in category page" src={game.thumbnail} />
    </Link>
  ));

  return (
    <div className={styles.Grid}>
      {renderGames()}
    </div>
  );
};

GameGrid.propTypes = {
  games: array.isRequired
};

export default GameGrid;
