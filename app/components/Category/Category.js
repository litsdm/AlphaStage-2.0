import React from 'react';
import PropTypes from 'prop-types';

import GameGrid from './GameGrid';
import SideBar from './SideBar';

const Category = ({ games, currentTag }) => (
  games.length < 1
    ? (
      <div>
        <p>No games found</p>
      </div>
    )
    : (
      <div>
        <SideBar currentTag={currentTag} />
        <GameGrid games={games} />
      </div>
    )
);

Category.propTypes = {
  games: PropTypes.array,
  currentTag: PropTypes.string
};

Category.defaultProps = {
  games: [],
  currentTag: ''
};

export default Category;
