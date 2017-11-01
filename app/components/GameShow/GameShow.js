import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const GameShow = ({ game }) => (
  <div>
    <Header coverImage={game.coverImage} title={game.title} />
  </div>
);

GameShow.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameShow;
