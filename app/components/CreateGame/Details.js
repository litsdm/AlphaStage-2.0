import React from 'react';
import PropTypes from 'prop-types';
import { Editor, RichUtils } from 'draft-js';
import styles from './styles.scss';

const Details = ({ editorState, handleChange }) => {
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

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Details</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="editor" className={styles.Tag}>Description</label>
          <div className={styles.Editor}>
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
      </div>
    </div>
  );
};

Details.propTypes = {
  editorState: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Details;
