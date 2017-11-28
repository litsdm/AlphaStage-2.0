import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styles from './Dropdown.scss';

const Dropdown = ({ games, selectedIndex, display, selectGame }) => {
  const renderRows = () => (
    games.map((game, i) => (
      <button key={uuid()} className={styles.Row} onClick={selectGame(i)}>
        <img src={game.thumbnail} alt="game's thumbnail in game selection" />
        <p>{game.title}</p>
        {selectedIndex === i ? <i className="fa fa-check" /> : null}
      </button>
    ))
  );

  return (
    <div className={`${styles.Dropdown} ${display ? styles.show : ''}`}>
      <p className={styles.Head}>Switch Game</p>
      <div className={styles.Content}>
        {renderRows()}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  games: PropTypes.array,
  selectedIndex: PropTypes.number,
  display: PropTypes.bool,
  selectGame: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
  games: [],
  selectedIndex: 0,
  display: false
};

export default Dropdown;
