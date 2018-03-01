import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import { array, func } from 'prop-types';
import styles from './Comments.scss';

const CommentList = ({ comments, setState }) => {
  const removeComment = (index) => () => {
    const value = [...comments.slice(0, index), ...comments.slice(index + 1)];
    setState('comments', value);
  };

  const renderComments = () => {
    const now = moment();
    return comments.map((comment, index) => (
      <div key={uuid()} className={styles.CommentWrapper}>
        <div className={styles.Comment}>
          <div className={styles.Top}>
            <p>Commented {now.to(comment.createdAt)}</p>
            <button onClick={removeComment(index)}><i className="fa fa-times" /></button>
          </div>
          <div className={styles.Body}><p>{comment.body}</p></div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.CommentList}>
      {renderComments()}
    </div>
  );
};

CommentList.propTypes = {
  comments: array,
  setState: func.isRequired
};

CommentList.defaultProps = {
  comments: []
};

export default CommentList;
