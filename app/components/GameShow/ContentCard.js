import React from 'react'; // eslint-disable-line
import { EditorState, convertFromRaw, Editor } from 'draft-js';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import InfoCard from './InfoCard';
import AdditionalDetails from './AdditionalDetails';

const ContentCard = ({ game, progress, isDownloading, downloadId, openGame }) => {
  const editorState = () => {
    const contentState = convertFromRaw(JSON.parse(game.descriptionState));
    return EditorState.createWithContent(contentState);
  };

  return (
    <div id="contentCard" className={styles.ContentCard}>
      <div className={styles.Row}>
        <div className={styles.LeftColumn}>
          <p className={styles.Title}>{game.title}</p>
          <Editor
            editorState={editorState()}
            readOnly
          />
        </div>
        <div className={styles.RightColumn}>
          <InfoCard
            game={game}
            progress={progress}
            isDownloading={isDownloading}
            downloadId={downloadId}
            openGame={openGame}
          />
        </div>
      </div>
      <AdditionalDetails
        languages={game.languages}
        publisher={game.publisher}
        spaceRequired={game.spaceRequired}
        website={game.website}
      />
    </div>
  );
};

ContentCard.propTypes = {
  game: PropTypes.object.isRequired,
  openGame: PropTypes.func.isRequired,
  progress: PropTypes.number,
  isDownloading: PropTypes.bool,
  downloadId: PropTypes.string
};

ContentCard.defaultProps = {
  progress: 0,
  isDownloading: false,
  downloadId: ''
};

export default ContentCard;
