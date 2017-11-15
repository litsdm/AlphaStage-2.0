import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';

const mapStateToProps = ({ game }) => (
  {
    ...game,
    downloadId: game.id
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

const GamePage = (props) => {
  const {
    game,
    loading,
    isDownloading,
    downloadId
  } = props;

  return (
    loading
    ? <Loader />
    : <GameShow
      game={game}
      isDownloading={isDownloading}
      downloadId={downloadId}
    />
  );
};

GamePage.propTypes = {
  loading: PropTypes.bool,
  game: PropTypes.object,
  isDownloading: PropTypes.bool,
  downloadId: PropTypes.string.isRequired
};

GamePage.defaultProps = {
  loading: false,
  game: {},
  isDownloading: false,
};

const GamePageWithProps = connect(mapStateToProps, null)(GamePage);
const GamePageWithData = withGame(GamePageWithProps);

export default GamePageWithData;
