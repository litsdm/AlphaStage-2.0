import React from 'react'; //eslint-disable-line
import { array, func, object, string } from 'prop-types';
import { Editor, RichUtils } from 'draft-js';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import TagsInput from '../TagsInput/TagsInput';

const genres = [
  'Action',
  'Adventure',
  'Indie',
  'Massively Multiplayer',
  'Platformer',
  'Puzzle',
  'Role Playing',
  'Shooter',
  'Simulation',
  'Sports',
  'Strategy',
  'Other'
];

const Details = ({ editorState, tags, genre, handleChange, validatedInputClass }) => {
  const handleAddTag = (tag) => {
    const formattedTag = tag.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    const value = [...tags, formattedTag];
    handleChange({ target: { name: 'tags', value } });
  };

  const handleRemoveTag = (index) => {
    const value = [...tags.slice(0, index), ...tags.slice(index + 1)];
    handleChange({ target: { name: 'tags', value } });
  };

  const onChange = (value) => {
    handleChange({ target: { name: 'editorState', value } });
  };

  const handleKeyCommand = (command, currentState) => {
    const newState = RichUtils.handleKeyCommand(currentState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (inlineStyle) => () => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const renderOptions = () => (
    genres.map(value => <option value={value} key={uuid()}>{value}</option>)
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Details</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="editor" className={styles.Tag}>Description</label>
          <div className={validatedInputClass(styles.Editor, 'editorContainer')} id="editorContainer">
            <div className={styles.EditorButtons}>
              <button onClick={toggleInlineStyle('BOLD')}><i className="fa fa-bold" /></button>
              <button onClick={toggleInlineStyle('ITALIC')}><i className="fa fa-italic" /></button>
              <button onClick={toggleInlineStyle('UNDERLINE')}><i className="fa fa-underline" /></button>
            </div>
            <div className={styles.EditorDivider} />
            <Editor
              id="editor"
              editorState={editorState}
              onChange={onChange}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="genreSelect" className={styles.Tag}>Genre</label>
          <select
            id="genreSelect"
            name="genre"
            className={styles.Select}
            onChange={handleChange}
            value={genre}
          >
            {renderOptions()}
          </select>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="tags" className={styles.Tag}>Tags</label>
          <p className={styles.InputDescription}>
            When you finish writing your tag press Enter to add it.
          </p>
          <TagsInput tags={tags} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} />
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  editorState: object.isRequired,
  handleChange: func.isRequired,
  tags: array.isRequired,
  genre: string.isRequired,
  validatedInputClass: func.isRequired
};

export default Details;
