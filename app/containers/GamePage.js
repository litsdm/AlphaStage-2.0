import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { exec } from 'child_process';
import PropTypes from 'prop-types';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';

import { startInstall, finishDownload } from '../actions/game';

const mapStateToProps = ({ game }) => (
  {
    ...game
  }
);

const mapDispatchToProps = dispatch => ({
  startInstalling: () => dispatch(startInstall()),
  downloadFinish: () => dispatch(finishDownload())
});

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

const GamePage = ({ game, loading, isDownloading, startInstalling, downloadFinish }) => {
  ipcRenderer.on('download-finish', (event, args) => {
    startInstalling();
    const { savePath, url } = args;

    const brokenUrl = url.split('/');
    const filename = brokenUrl[brokenUrl.length - 1];
    const unzipTo = savePath.substring(0, savePath.length - filename.length);

    if (process.platform === 'darwin') unzipMac(savePath, unzipTo);
  });

  const unzipMac = (savePath, unzipTo) => {
    exec(`unzip ${savePath} -d ${unzipTo}`, (error) => {
      if (error) { throw error; }

      // Delete .zip after unzipping
      exec(`rm -rf ${savePath}`, (err) => {
        if (err) { throw err; }
        downloadFinish();
      });
    });
  };

  return (
    loading
    ? <Loader />
    : <GameShow
      game={game}
      isDownloading={isDownloading}
    />
  );
};

GamePage.propTypes = {
  loading: PropTypes.bool,
  game: PropTypes.object,
  isDownloading: PropTypes.bool,
  startInstalling: PropTypes.func.isRequired,
  downloadFinish: PropTypes.func.isRequired
};

GamePage.defaultProps = {
  loading: false,
  game: {},
  isDownloading: false,
};

const GamePageWithProps = connect(mapStateToProps, mapDispatchToProps)(GamePage);
const GamePageWithData = withGame(GamePageWithProps);

export default GamePageWithData;
