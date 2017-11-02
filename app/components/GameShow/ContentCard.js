import React from 'react'; // eslint-disable-line
import { EditorState, convertFromRaw, Editor } from 'draft-js';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const ContentCard = ({ game }) => {
  const editorState = () => {
    const contentState = convertFromRaw(JSON.parse(game.descriptionState));
    return EditorState.createWithContent(contentState);
  };

  return (
    <div id="contentCard" className={styles.ContentCard}>
      <p className={styles.Title}>{game.title}</p>
      <div className={styles.Row}>
        <Editor
          editorState={editorState()}
          readOnly
        />
      </div>
    </div>
  );
};

ContentCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default ContentCard;
