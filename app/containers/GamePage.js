import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';

const mapStateToProps = ({ game }) => (
  {
    ...game
  }
);

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

const GamePage = ({ game, loading, isDownloading, isInstalling }) => (
  loading
  ? <Loader />
  : <GameShow
    game={game}
    isDownloading={isDownloading}
    isInstalling={isInstalling}
  />
);

GamePage.propTypes = {
  loading: PropTypes.bool,
  game: PropTypes.object,
  isDownloading: PropTypes.bool,
  isInstalling: PropTypes.bool
};

GamePage.defaultProps = {
  loading: false,
  game: {},
  isDownloading: false,
  isInstalling: false
};

const GamePageWithProps = connect(mapStateToProps, null)(GamePage);
const GamePageWithData = withGame(GamePageWithProps);

export default GamePageWithData;
