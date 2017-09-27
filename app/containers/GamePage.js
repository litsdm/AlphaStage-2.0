import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import GameShow from '../components/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';

const withGame = graphql(fullGameQuery, {
  props: ({ data }) => {
    if (!data.game) return { loading: data.loading };
    if (data.error) return { hasErrors: true };
    return {
      game: data.game,
    };
  },
  options: (props) => ({ variables: { id: props.match.params.id } })
});

const GamePage = ({ game, loading }) => (
  loading
  ? <Loader />
  : <GameShow game={game} />
);

GamePage.propTypes = {
  loading: PropTypes.bool,
  game: PropTypes.object,
};

GamePage.defaultProps = {
  loading: false,
  game: {}
};

const GamePageWithData = withGame(GamePage);

export default GamePageWithData;
