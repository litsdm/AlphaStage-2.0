import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { object, func, string, bool } from 'prop-types';
import Slider from 'react-slick';
import uuid from 'uuid/v4';
import jwtDecode from 'jwt-decode';
import styles from './styles.scss';

import { getStatus } from '../../helpers/dates';
import gamePath from '../../helpers/gamePath';

import Header from './Header';
import ContentCard from './ContentCard';
import Modal from '../Modal';
import Banner from '../Dashboard/TestingSessions/Banner';
import InfoModal from '../Dashboard/TestingSessions/InfoModal';
import FeedbackModal from './Feedback/FeedbackModal';

const INITIAL_OFFSET = 427;
const OFFSET_DIFFERENCE = 375;
const PERCENTAGE_DIFFERENCE = 10;
const INITIAL_PERCENTAGE = 90;

class GameShow extends Component {
  state = {
    progress: 0,
  };

  componentWillMount() {
    this.checkForActiveSession();
  }

  componentDidMount() {
    const { game, downloadId, incrementMetric } = this.props;
    const contentContainer = document.getElementById('content-container');
    const editorRoot = document.getElementsByClassName('DraftEditor-root')[0];

    incrementMetric(game._id, 'pageViews');

    contentContainer.addEventListener('scroll', this.handleScroll);
    editorRoot.classList += ` ${styles.DraftRoot}`;

    if (game._id === downloadId) this.setDownloadListener();
  }

  componentDidUpdate(prevProps) {
    const { downloadId } = this.props;
    if (prevProps.downloadId !== downloadId) this.setDownloadListener();
  }

  componentWillUnmount() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.removeEventListener('scroll', this.handleScroll);
    ipcRenderer.removeAllListeners(['download-progress']);
  }

  setDownloadListener = () => {
    const { game, downloadId } = this.props;

    ipcRenderer.on('download-progress', (e, progress) => {
      if (game._id === downloadId) this.setState({ progress });
    });
  }

  checkForActiveSession = () => {
    const { game, handleChange } = this.props;
    const { testingSessions } = game;
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);

    testingSessions.every(session => {
      const status = getStatus(session);
      const ids = session.testerIds || [];

      if (status === 'Active' && !ids.includes(user._id)) {
        handleChange({ target: { name: 'activeSession', value: session } });
        return false;
      }

      return true;
    });
  }

  handleScroll = () => {
    const element = document.getElementById('contentCard');
    const rect = element.getBoundingClientRect();
    const position = rect.top + document.body.scrollTop;

    const newWidth = position <= 52
      ? 100
      : (
        (
          (
            (INITIAL_OFFSET - position) * PERCENTAGE_DIFFERENCE
          ) / OFFSET_DIFFERENCE
        ) + INITIAL_PERCENTAGE
      );

    element.style.width = `${newWidth}%`;
  }

  renderSlider = () => {
    const { game } = this.props;
    const screenshots = game.screenshots.map(screenshot => (
      <img key={uuid()} className={styles.Screenshot} src={screenshot} alt="Game screenshot" />
    ));

    const trailer = game.trailer
      ? (
        <iframe
          id={`trailer-${game._id}`}
          title={game.title}
          src={`${game.trailer}?enablejsapi=1`}
          frameBorder="0"
          width="100%"
          height="405px"
        />
      )
      : null;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {trailer}
        {screenshots}
      </Slider>
    );
  }

  startSession = () => {
    const { game, openGame } = this.props;
    const path = gamePath(game);

    openGame(path, 'session');
  }

  render() {
    const {
      activeSession,
      game,
      isDownloading,
      downloadId,
      openGame,
      finalVideo,
      micAllowed,
      handleChange,
      s3Url,
      sendFeedback
    } = this.props;
    const { progress } = this.state;

    const galleryModalId = `gallery-${game._id}`;
    const feedbackModalId = `feedback-${game._id}`;
    const sessionModalId = `session-${game._id}`;

    return (
      <div className="gameshow">
        {activeSession ? <Banner modalId={sessionModalId} /> : null}
        <Header coverImage={game.coverImage} modalId={galleryModalId} />
        <ContentCard
          game={game}
          progress={progress}
          isDownloading={isDownloading}
          downloadId={downloadId}
          openGame={openGame}
        />
        <Modal isGallery id={galleryModalId} trailerId={`trailer-${game._id}`}>
          {this.renderSlider()}
        </Modal>
        <FeedbackModal
          id={feedbackModalId}
          finalVideo={finalVideo}
          session={activeSession}
          s3Url={s3Url}
          sendFeedback={sendFeedback}
          gameId={game._id}
        />
        <InfoModal
          id={sessionModalId}
          session={activeSession}
          startSession={this.startSession}
          handleChange={handleChange}
          micAllowed={micAllowed}
        />
      </div>
    );
  }
}

GameShow.propTypes = {
  activeSession: object,
  game: object.isRequired,
  downloadId: string.isRequired,
  incrementMetric: func.isRequired,
  openGame: func.isRequired,
  isDownloading: bool,
  finalVideo: string,
  micAllowed: bool,
  handleChange: func.isRequired,
  s3Url: string,
  sendFeedback: func.isRequired
};

GameShow.defaultProps = {
  isDownloading: false,
  micAllowed: true,
  finalVideo: null,
  activeSession: null,
  s3Url: ''
};

export default GameShow;
