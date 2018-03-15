import React from 'react';
import { array, bool, func, number, object, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

import Dropdown from './Dropdown';

const Header = (props) => {
  const {
    games,
    currentIndex,
    currentGame,
    displayDropdown,
    modalId,
    tabIndex,
    selectTab,
    toggleDropdown,
    selectGame
  } = props;

  const openSettings = () => {
    document.getElementById(modalId).style.display = 'block';
  };

  return (
    <div className={styles.Header} style={{ backgroundImage: `url(${currentGame.coverImage})` }}>
      <div className={styles.Overlay} />
      <div className={styles.TitleContainer}>
        <p className={styles.Title}>{currentGame.title}</p>
      </div>
      <Dropdown
        games={games}
        currentIndex={currentIndex}
        display={displayDropdown}
        selectGame={selectGame}
      />
      <div className={styles.Menu}>
        <button
          className={`${styles.Tab} ${tabIndex === 0 ? styles.active : ''}`}
          onClick={selectTab(0)}
        >
          Overview
          <div className={styles.Indicator} />
        </button>
        <button
          className={`${styles.Tab} ${tabIndex === 1 ? styles.active : ''}`}
          onClick={selectTab(1)}
        >
          Testing Sessions
          <div className={styles.Indicator} />
        </button>
        <button className={`${styles.Tab} ${styles.Drop}`} onClick={toggleDropdown}>
          Your games <i className={`fa ${displayDropdown ? 'fa-times' : 'fa-chevron-down'}`} />
          <div className={styles.Indicator} />
        </button>
      </div>
      <div className={styles.ConfigButtons}>
        <Link to={`/games/edit/${currentGame._id}`}>
          <i className="fa fa-pencil" />
        </Link>
        <button onClick={openSettings}>
          <i className="fa fa-cog" />
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  games: array,
  currentIndex: number,
  currentGame: object,
  displayDropdown: bool,
  modalId: string,
  tabIndex: number,
  selectTab: func.isRequired,
  toggleDropdown: func.isRequired,
  selectGame: func.isRequired
};

Header.defaultProps = {
  games: [],
  currentIndex: 0,
  currentGame: {},
  displayDropdown: false,
  modalId: '',
  tabIndex: 0
};

export default Header;
