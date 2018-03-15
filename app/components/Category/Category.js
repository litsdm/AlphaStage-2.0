import React from 'react';
import { array, func, string } from 'prop-types';

import GameGrid from './GameGrid';
import SideBar from './SideBar';
import NotFound from './NotFound';

const Category = ({ games, currentCategory, setCategory }) => (
  <div style={{ height: '100%' }}>
    <SideBar currentCategory={currentCategory} setCategory={setCategory} />
    {
      games.length < 1
        ? <NotFound />
        : <GameGrid games={games} />
    }
  </div>
);

Category.propTypes = {
  games: array,
  currentCategory: string,
  setCategory: func.isRequired
};

Category.defaultProps = {
  games: [],
  currentCategory: ''
};

export default Category;
