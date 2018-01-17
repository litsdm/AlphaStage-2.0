import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { exec } from 'child_process';
import PropTypes from 'prop-types';

import DesktopRecorder from '../libs/DesktopRecorder';
import MicrophoneRecorder from '../libs/MicrophoneRecorder';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';
import addToMetric from '../graphql/addToMetric.graphql';

const mapStateToProps = ({ game }) => (
  {
    ...game,
    downloadId: game.id
  }
);

const withGraphql = compose(
  graphql(addToMetric, {
    props: ({ mutate }) => ({
      incrementMetric: (gameId, metric) => mutate({ variables: { gameId, metric } }),
    }),
  }),
  graphql(fullGameQuery, {
    props: ({ data }) => {
      if (!data.game) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        game: data.game,
      };
    },
    options: (props) => ({ variables: { id: props.match.params.id } })
  })
);

const micOptions = {
  audioBitsPerSecond: 128000,
  mimeType: 'audio/webm;codecs=opus'
};

class GamePage extends Component {
  state = {
    desktopBlob: null,
    desktopRecorder: null,
    micBlob: null,
    micRecorder: null
  }

  componentWillReceiveProps({ game, loading }) {
    if (!loading && loading !== this.props.loading) {
      this.setState({
        desktopRecorder: new DesktopRecorder(this.onMediaStop, game.title),
        micRecorder: new MicrophoneRecorder(null, this.onMediaStop, micOptions)
      });
    }
  }

  onMediaStop = (type, blobObject) => {
    const name = type === 'mic' ? 'micBlob' : 'desktopBlob';

    this.setState({ [name]: blobObject });
  }

  openGame = (localPath) => {
    const { micRecorder, desktopRecorder } = this.state;
    const openCommand = process.platform === 'darwin'
      ? `open -a ${localPath} --wait-apps`
      : localPath;

    exec(openCommand, (error) => {
      if (error) throw error;

      // Game was closed
      desktopRecorder.stopRecording();
      micRecorder.stopRecording();
    });

    setTimeout(() => desktopRecorder.startRecording(), 5000);
    setTimeout(() => micRecorder.startRecording(), 5000);
  };

  render() {
    const {
      game,
      loading,
      incrementMetric,
      isDownloading,
      downloadId
    } = this.props;

    return (
      loading
        ? <Loader />
        : <GameShow
          game={game}
          isDownloading={isDownloading}
          downloadId={downloadId}
          incrementMetric={incrementMetric}
          openGame={this.openGame}
        />
    );
  }
}

GamePage.propTypes = {
  loading: PropTypes.bool,
  game: PropTypes.object,
  isDownloading: PropTypes.bool,
  downloadId: PropTypes.string.isRequired,
  incrementMetric: PropTypes.func.isRequired
};

GamePage.defaultProps = {
  loading: false,
  game: {},
  isDownloading: false,
};

const GamePageWithProps = connect(mapStateToProps, null)(GamePage);
const GamePageWithData = withGraphql(GamePageWithProps);

export default GamePageWithData;
