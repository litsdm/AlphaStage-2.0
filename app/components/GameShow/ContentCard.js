import React from 'react'; // eslint-disable-line
import { EditorState, convertFromRaw, Editor } from 'draft-js';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import InfoCard from './InfoCard';

const ContentCard = ({ game, isExpanded }) => {
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
          <InfoCard game={game} isExpanded={isExpanded} />
        </div>
      </div>
    </div>
  );
};

ContentCard.propTypes = {
  game: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired
};

export default ContentCard;
