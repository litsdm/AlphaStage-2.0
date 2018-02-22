import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { exec } from 'child_process';
import fs from 'fs';
import { remote } from 'electron';
import PropTypes from 'prop-types';

import DesktopRecorder from '../libs/DesktopRecorder';
import MicrophoneRecorder from '../libs/MicrophoneRecorder';
import { mergeVideoAndAudio } from '../helpers/video';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';
import addToMetric from '../graphql/addToMetric.graphql';

const { app } = remote;
const videoReader = new FileReader();
const audioReader = new FileReader();

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
    audioFile: null,
    desktopRecorder: null,
    finalVideo: null,
    micRecorder: null,
    micAllowed: true,
    videoFile: null
  }

  componentWillReceiveProps({ game, loading }) {
    if (!loading && loading !== this.props.loading) {
      this.setState({
        desktopRecorder: new DesktopRecorder(this.onMediaStop, game.title),
        micRecorder: new MicrophoneRecorder(null, this.onMediaStop, micOptions)
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  onMediaStop = (type, blobObject) => {
    this.saveRecordedFile(type, blobObject.blob);
  }

  saveRecordedFile = (type, blob) => {
    const { micAllowed } = this.state;
    const reader = type === 'mic' ? audioReader : videoReader;
    const name = type === 'mic' ? 'audioFile' : 'videoFile';
    const appDataPath = app.getPath('appData');
    const path = `${appDataPath}/ASLibrary/Sessions/${type}-${new Date().getTime()}.webm`;

    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      fs.writeFile(path, buffer, {}, err => {
        if (err) {
          console.error(err);
          return;
        }
        if (micAllowed) {
          this.setState({ [name]: path }, this.mergeBlobs);
        } else {
          this.setState({ finalVideo: path });
        }
      });
    };

    reader.readAsArrayBuffer(blob);
  }

  mergeBlobs = () => {
    const { game } = this.props;
    const { audioFile, videoFile } = this.state;
    const appDataPath = app.getPath('appData');

    if (audioFile === null || videoFile === null) {
      setTimeout(() => this.mergeBlobs(), 500);
      return;
    }

    const output = `${appDataPath}/ASLibrary/Sessions/merged-${game._id}-${new Date().getTime()}.mp4`;

    mergeVideoAndAudio(audioFile, videoFile, output, (processedUrl) => {
      this.setState({ finalVideo: processedUrl });
    });
  }

  openGame = (localPath, type = 'play') => {
    const { game } = this.props;
    const { micRecorder, desktopRecorder, micAllowed } = this.state;
    const openCommand = process.platform === 'darwin'
      ? `open -a ${localPath} --wait-apps`
      : localPath;

    if (type !== 'session') {
      exec(openCommand, error => { if (error) throw error; });
      return;
    }

    exec(openCommand, (error) => {
      if (error) throw error;

      // Game was closed
      desktopRecorder.stopRecording();
      if (micAllowed) micRecorder.stopRecording();
      document.getElementById(`feedback-${game._id}`).style.display = 'block';
    });

    setTimeout(() => desktopRecorder.startRecording(), 5000);
    if (micAllowed) setTimeout(() => micRecorder.startRecording(), 5000);
  };

  render() {
    const {
      game,
      loading,
      incrementMetric,
      isDownloading,
      downloadId
    } = this.props;
    const { finalVideo, micAllowed } = this.state;

    return (
      loading
        ? <Loader />
        : <GameShow
          game={game}
          isDownloading={isDownloading}
          downloadId={downloadId}
          incrementMetric={incrementMetric}
          openGame={this.openGame}
          finalVideo={finalVideo}
          micAllowed={micAllowed}
          handleChange={this.handleChange}
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
