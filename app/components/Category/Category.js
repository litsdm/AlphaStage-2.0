import React from 'react';
import PropTypes from 'prop-types';

import GameGrid from './GameGrid';
import SideBar from './SideBar';

const Category = ({ games }) => (
  games.length < 1
    ? (
      <div>
        <p>No games found</p>
      </div>
    )
    : (
      <div>
        <SideBar />
        <GameGrid games={games} />
      </div>
    )
);

Category.propTypes = {
  games: PropTypes.array
};

Category.defaultProps = {
  games: []
};

export default Category;
