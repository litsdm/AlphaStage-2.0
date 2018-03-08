import React from 'react';
import { string, array, func } from 'prop-types';
import styles from './DisplayFeedbackModal.scss';

import Modal from '../../Modal';

import FeedbackContent from '../../GameShow/Feedback/FeedbackContent';

const DisplayFeedbackModal = ({ videoUrl, comments, objectives, id, testId, markTest }) => {
  const handleMarkClick = (mark) => () => {
    markTest(testId, mark);
    document.getElementById(id).style.display = 'none';
  };

  return (
    <Modal title="Testing Feedback" id={id}>
      <FeedbackContent display videoUrl={videoUrl} comments={comments} objectives={objectives} />
      <div className={styles.Footer}>
        <button className={styles.BadButton} onClick={handleMarkClick(0)}>
          <i className="fa fa-thumbs-down" /> Bad Feedback
        </button>
        <button className={styles.GoodButton} onClick={handleMarkClick(1)}>
          <i className="fa fa-thumbs-up" /> Good Feedback
        </button>
      </div>
    </Modal>
  );
};

DisplayFeedbackModal.propTypes = {
  comments: array,
  objectives: array,
  videoUrl: string,
  testId: string,
  id: string.isRequired,
  markTest: func.isRequired
};

DisplayFeedbackModal.defaultProps = {
  comments: [],
  objectives: [],
  videoUrl: '',
  testId: ''
};

export default DisplayFeedbackModal;
