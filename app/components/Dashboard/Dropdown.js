import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styles from './Dropdown.scss';

const Dropdown = ({ games, selectedIndex }) => {
  const renderRows = () => (
    games.map((game, i) => (
      <div key={uuid()} className={styles.Row}>
        <img src={game.thumbnail} alt="game's thumbnail in game selection" />
        <p>{game.title}</p>
        {selectedIndex === i ? <i className="fa fa-check" /> : null}
      </div>
    ))
  );

  return (
    <div className={styles.Dropdown}>
      <p className={styles.Head}>Switch Game</p>
      <div className={styles.Content}>
        {renderRows()}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  games: PropTypes.array,
  selectedIndex: PropTypes.number
};

Dropdown.defaultProps = {
  games: [],
  selectedIndex: 0
};

export default Dropdown;
