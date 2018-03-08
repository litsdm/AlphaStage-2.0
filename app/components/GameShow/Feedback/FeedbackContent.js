import React from 'react';
import { string, array, bool, func } from 'prop-types';
import styles from './FeedbackModal.scss';

import VideoPlayer from '../../VideoPlayer';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import ObjectiveList from './ObjectiveList';

const FeedbackContent = ({ videoUrl, comments, objectives, display, videoId, setState }) => (
  <React.Fragment>
    {
      videoUrl
        ? <VideoPlayer src={videoUrl} id={videoId} />
        : null
    }
    <div className={styles.Content}>
      <p className={styles.Title}>Comments</p>
      <CommentList display={display} comments={comments} setState={setState} />
      {
        display
          ? null
          : <CommentInput comments={comments} setState={setState} />
      }
      <p className={styles.Title}>Objectives</p>
      <ObjectiveList display={display} setState={setState} objectives={objectives} />
    </div>
  </React.Fragment>
);

FeedbackContent.propTypes = {
  videoUrl: string,
  comments: array,
  objectives: array,
  display: bool,
  videoId: string,
  setState: func
};

FeedbackContent.defaultProps = {
  videoUrl: '',
  comments: [],
  objectives: [],
  display: false,
  videoId: '',
  setState: () => {}
};

export default FeedbackContent;
