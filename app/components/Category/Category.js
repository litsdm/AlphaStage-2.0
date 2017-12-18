import React from 'react';
import PropTypes from 'prop-types';

import GameGrid from './GameGrid';

const Category = ({ games }) => (
  games.length < 1
    ? (
      <div>
        <p>No games found</p>
      </div>
    )
    : <GameGrid games={games} />
);

Category.propTypes = {
  games: PropTypes.array
};

Category.defaultProps = {
  games: []
};

export default Category;
