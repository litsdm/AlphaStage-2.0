import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import ContentCard from './ContentCard';

const INITIAL_OFFSET = 427;
const OFFSET_DIFFERENCE = 375;
const PERCENTAGE_DIFFERENCE = 10;
const INITIAL_PERCENTAGE = 90;

class GameShow extends Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    const { game, downloadId } = this.props;
    const contentContainer = document.getElementById('content-container');
    const editorRoot = document.getElementsByClassName('DraftEditor-root')[0];

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

  render() {
    const { game, isDownloading, downloadId } = this.props;
    const { progress } = this.state;

    return (
      <div>
        <Header coverImage={game.coverImage} />
        <ContentCard
          game={game}
          progress={progress}
          isDownloading={isDownloading}
          downloadId={downloadId}
        />
      </div>
    );
  }
}

GameShow.propTypes = {
  game: PropTypes.object.isRequired,
  downloadId: PropTypes.string.isRequired,
  isDownloading: PropTypes.bool,
};

GameShow.defaultProps = {
  isDownloading: false,
};

export default GameShow;
