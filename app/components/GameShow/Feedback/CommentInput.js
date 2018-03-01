import React from 'react';
import moment from 'moment';
import { array, func } from 'prop-types';
import styles from './Comments.scss';

const CommentInput = ({ comments, setState }) => {
  const handleKeyPress = ({ key }) => {
    if (key !== 'Enter') return;
    comment();
  };

  const comment = () => {
    const element = document.getElementById('commentsInput');
    const { value } = element;
    if (value) {
      const newComment = {
        body: value,
        createdAt: moment()
      };

      const newComments = [...comments, newComment];
      setState('comments', newComments);
      element.value = '';
    }
  };

  return (
    <div className={styles.InputContainer}>
      <input
        id="commentsInput"
        name="comments"
        className={styles.Input}
        onKeyPress={handleKeyPress}
        placeholder="@2:35 I found a bug that wouldn't let me get through the level."
      />
      <button onClick={comment} className={styles.Add}>Comment</button>
    </div>
  );
};

CommentInput.propTypes = {
  comments: array,
  setState: func.isRequired
};

CommentInput.defaultProps = {
  comments: []
};

export default CommentInput;
