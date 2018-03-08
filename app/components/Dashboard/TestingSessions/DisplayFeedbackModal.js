import React from 'react';
import { string, array } from 'prop-types';
import styles from './DisplayFeedbackModal.scss';

import Modal from '../../Modal';

import FeedbackContent from '../../GameShow/Feedback/FeedbackContent';

const DisplayFeedbackModal = ({ videoUrl, comments, objectives, id }) => (
  <Modal title="Testing Feedback" id={id}>
    <FeedbackContent display videoUrl={videoUrl} comments={comments} objectives={objectives} />
    <div className={styles.Footer}>
      <button className={styles.BadButton}>
        <i className="fa fa-thumbs-down" /> Bad Feedback
      </button>
      <button className={styles.GoodButton}>
        <i className="fa fa-thumbs-up" /> Good Feedback
      </button>
    </div>
  </Modal>
);

DisplayFeedbackModal.propTypes = {
  comments: array,
  objectives: array,
  videoUrl: string,
  id: string.isRequired
};

DisplayFeedbackModal.defaultProps = {
  comments: [],
  objectives: [],
  videoUrl: ''
};

export default DisplayFeedbackModal;
