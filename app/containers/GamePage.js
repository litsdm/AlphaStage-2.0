import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { exec } from 'child_process';
import fs from 'fs';
import { remote } from 'electron';
import jwtDecode from 'jwt-decode';
import { bool, object, string, func } from 'prop-types';

import DesktopRecorder from '../libs/DesktopRecorder';
import MicrophoneRecorder from '../libs/MicrophoneRecorder';
import { mergeVideoAndAudio, convertToMp4 } from '../helpers/video';
import callApi, { getFileBlob, uploadFile } from '../helpers/apiCaller';

import GameShow from '../components/GameShow/GameShow';
import Loader from '../components/Loader';

import fullGameQuery from '../graphql/fullGame.graphql';
import addToMetric from '../graphql/addToMetric.graphql';
import createTest from '../graphql/createTest.graphql';
import addExp from '../graphql/addExp.graphql';
import userLevel from '../graphql/userLevel.graphql';

const { app } = remote;
const videoReader = new FileReader();
const audioReader = new FileReader();

const mapStateToProps = ({ game, user }) => (
  {
    user,
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
  graphql(addExp, {
    props: ({ ownProps: { user }, mutate }) => ({
      incrementExp: (input) => mutate({ variables: { input: { ...input, _id: user._id } } })
    })
  }),
  graphql(userLevel, {
    props: ({ data }) => {
      if (!data.user) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        userExp: data.user,
      };
    },
    options: ({ user }) => ({ variables: { id: user._id } })
  }),
  graphql(createTest, {
    props: ({ mutate }) => ({
      sendFeedback: (feedback, gameId) => {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        const input = { ...feedback, testerId: user._id };
        const queriesToRefetch = [
          {
            query: fullGameQuery,
            variables: { id: gameId }
          }
        ];
        mutate({ variables: { input }, refetchQueries: queriesToRefetch, });
      }
    })
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
    activeSession: null,
    audioFile: null,
    desktopRecorder: null,
    finalVideo: null,
    micRecorder: null,
    micAllowed: true,
    s3Url: '',
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
    this.saveRecordedFile(type, blobObject);
  }

  saveRecordedFile = (type, { blob }) => {
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
          this.setState({ [name]: path }, () => {
            const { audioFile, videoFile } = this.state;
            if (audioFile && videoFile) {
              this.mergeBlobs();
            }
          });
        } else {
          this.setState({ [name]: path }, this.convertVideo);
        }
      });
    };

    reader.readAsArrayBuffer(blob);
  }

  getFileAndUpload = (path) => {
    getFileBlob(path, (blob) => {
      this.uploadVideo(blob);
    });
  }

  uploadVideo = (file) => {
    const { game } = this.props;
    const fileName = `test-${game._id}-${new Date().getTime()}.${file.type.split('/')[1]}`;
    let s3Url;
    callApi(`sign-s3?file-name=${fileName}&file-type=${file.type}`)
      .then(res => res.json())
      .then(({ signedRequest, url }) => {
        s3Url = url;
        return uploadFile(file, signedRequest);
      })
      .then(res => {
        if (res.status !== 200) return Promise.reject();
        this.setState({ s3Url });
        return s3Url;
      })
      .catch(() => console.log('error ocurred'));
  }

  convertVideo = () => {
    const { game } = this.props;
    const { videoFile } = this.state;
    const appDataPath = app.getPath('appData');

    const output = `${appDataPath}/ASLibrary/Sessions/merged-${game._id}-${new Date().getTime()}.mp4`;

    convertToMp4(videoFile, output, (processedUrl) => {
      this.setState({ finalVideo: processedUrl });
      this.getFileAndUpload(processedUrl);
    });
  }

  mergeBlobs = () => {
    const { game } = this.props;
    const { audioFile, videoFile } = this.state;
    const appDataPath = app.getPath('appData');

    const output = `${appDataPath}/ASLibrary/Sessions/merged-${game._id}-${new Date().getTime()}.mp4`;

    console.log(audioFile, videoFile);

    mergeVideoAndAudio(audioFile, videoFile, output, (processedUrl) => {
      this.setState({ finalVideo: processedUrl });
      this.getFileAndUpload(processedUrl);
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

  handleFeedback = (feedback, gameId) => {
    const { sendFeedback } = this.props;
    sendFeedback(feedback, gameId);
    this.setState({ activeSession: null });
  }

  render() {
    const {
      game,
      loading,
      incrementMetric,
      incrementExp,
      isDownloading,
      downloadId,
      userExp
    } = this.props;
    const { activeSession, finalVideo, micAllowed, s3Url } = this.state;

    return (
      loading
        ? <Loader />
        : <GameShow
          activeSession={activeSession || undefined}
          game={game}
          isDownloading={isDownloading}
          downloadId={downloadId}
          incrementMetric={incrementMetric}
          openGame={this.openGame}
          finalVideo={finalVideo}
          micAllowed={micAllowed}
          handleChange={this.handleChange}
          s3Url={s3Url}
          sendFeedback={this.handleFeedback}
          addExp={incrementExp}
          userExp={userExp}
        />
    );
  }
}

GamePage.propTypes = {
  loading: bool,
  game: object,
  isDownloading: bool,
  userExp: object,
  downloadId: string.isRequired,
  incrementMetric: func.isRequired,
  incrementExp: func.isRequired,
  sendFeedback: func.isRequired
};

GamePage.defaultProps = {
  loading: false,
  game: {},
  isDownloading: false,
  userExp: {}
};

const GamePageWithData = withGraphql(GamePage);
const GamePageWithProps = connect(mapStateToProps, null)(GamePageWithData);

export default GamePageWithProps;
