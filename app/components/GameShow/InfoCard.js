import React from 'react';
import { bool, func, number, object, string } from 'prop-types';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import styles from './InfoCard.scss';

import GameButton from '../GameButton/ButtonContainer';
import ProgressBar from '../ProgressBar';

const InfoCard = ({ game, progress, isDownloading, downloadId, openGame, activeSession }) => {
  const renderTags = () => (
    game.tags.map(tag => <Link key={uuid()} to="/">{tag}</Link>)
  );

  return (
    <div className={styles.Info}>
      <div
        className={styles.Header}
        style={{ background: `url(${game.thumbnail})`, backgroundSize: '100% 100%' }}
      >
        <GameButton openGame={openGame} game={game} activeSession={activeSession} />
      </div>
      <div className={styles.Body}>
        <ProgressBar progress={progress} display={isDownloading && game._id === downloadId} />
        <div className={styles.Row}>
          <p className={styles.Subtitle}>Release Status</p>
          <p className={styles.Subvalue}>{game.releaseStatus.split(' - ')[0]}</p>
        </div>
        <div className={styles.Row}>
          <p className={styles.Subtitle}>Genre</p>
          <p className={styles.Subvalue}>{game.genre}</p>
        </div>
        <p className={styles.Subtitle}>Tags</p>
        <div className={styles.Tags}>
          {renderTags()}
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  game: object.isRequired,
  openGame: func.isRequired,
  progress: number,
  isDownloading: bool,
  downloadId: string,
  activeSession: object
};

InfoCard.defaultProps = {
  progress: 0,
  isDownloading: false,
  downloadId: '',
  activeSession: null
};

export default InfoCard;
