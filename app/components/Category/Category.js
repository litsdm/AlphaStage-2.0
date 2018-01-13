import React from 'react';
import PropTypes from 'prop-types';

import GameGrid from './GameGrid';
import SideBar from './SideBar';
import NotFound from './NotFound';

const Category = ({ games, currentTag }) => (
  <div style={{ height: '100%' }}>
    <SideBar currentTag={currentTag} />
    {
      games.length < 1
        ? <NotFound />
        : <GameGrid games={games} />
    }
  </div>
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
