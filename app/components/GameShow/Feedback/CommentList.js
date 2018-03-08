import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import { array, bool, func } from 'prop-types';
import styles from './Comments.scss';

const CommentList = ({ comments, setState, display }) => {
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
            {
              display
                ? null
                : <button onClick={removeComment(index)}><i className="fa fa-times" /></button>
            }
          </div>
          <div className={styles.Body}><p>{comment.body}</p></div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.CommentList} style={display ? { marginBottom: '24px' } : {}}>
      {renderComments()}
    </div>
  );
};

CommentList.propTypes = {
  comments: array,
  display: bool,
  setState: func.isRequired
};

CommentList.defaultProps = {
  comments: [],
  display: false
};

export default CommentList;
