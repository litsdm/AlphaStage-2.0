import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import { getStatus } from '../../helpers/dates';
import gamePath from '../../helpers/gamePath';

import Header from './Header';
import ContentCard from './ContentCard';
import Modal from '../Modal';
import Banner from '../Dashboard/TestingSessions/Banner';
import VideoPlayer from '../VideoPlayer';

const INITIAL_OFFSET = 427;
const OFFSET_DIFFERENCE = 375;
const PERCENTAGE_DIFFERENCE = 10;
const INITIAL_PERCENTAGE = 90;

class GameShow extends Component {
  state = {
    progress: 0,
    activeSession: null
  };

  componentDidMount() {
    const { game, downloadId, incrementMetric } = this.props;
    const contentContainer = document.getElementById('content-container');
    const editorRoot = document.getElementsByClassName('DraftEditor-root')[0];

    this.checkForActiveSession();
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
    const { testingSessions } = this.props.game;
    testingSessions.every(session => {
      const status = getStatus(session);

      if (status === 'Active') {
        this.setState({ activeSession: session });
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
    const { game, isDownloading, downloadId, openGame, finalVideo } = this.props;
    const { progress, activeSession } = this.state;

    const galleryModalId = `gallery-${game._id}`;
    const feedbackModalId = `feedback-${game._id}`;

    return (
      <div className="gameshow">
        {activeSession ? <Banner startSession={this.startSession} /> : null}
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
        <Modal title="Testing Feedback" id={feedbackModalId}>
          {
            finalVideo !== null
              ? <VideoPlayer src={finalVideo} />
              : null
          }
          <p>Other content</p>
        </Modal>
      </div>
    );
  }
}

GameShow.propTypes = {
  game: PropTypes.object.isRequired,
  downloadId: PropTypes.string.isRequired,
  incrementMetric: PropTypes.func.isRequired,
  openGame: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool,
  finalVideo: PropTypes.string
};

GameShow.defaultProps = {
  isDownloading: false,
  finalVideo: null
};

export default GameShow;
