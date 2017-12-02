import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Header from './Header';
import ContentCard from './ContentCard';
import Modal from '../Modal';

const INITIAL_OFFSET = 427;
const OFFSET_DIFFERENCE = 375;
const PERCENTAGE_DIFFERENCE = 10;
const INITIAL_PERCENTAGE = 90;

class GameShow extends Component {
  state = {
    progress: 0,
  };

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

  render() {
    const { game, isDownloading, downloadId } = this.props;
    const { progress } = this.state;

    const galleryModalId = `gallery-${game._id}`;

    return (
      <div className="gameshow">
        <Header coverImage={game.coverImage} modalId={galleryModalId} />
        <ContentCard
          game={game}
          progress={progress}
          isDownloading={isDownloading}
          downloadId={downloadId}
        />
        <Modal isGallery id={galleryModalId} trailerId={`trailer-${game._id}`}>
          {this.renderSlider()}
        </Modal>
      </div>
    );
  }
}

GameShow.propTypes = {
  game: PropTypes.object.isRequired,
  downloadId: PropTypes.string.isRequired,
  incrementMetric: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool
};

GameShow.defaultProps = {
  isDownloading: false,
};

export default GameShow;
