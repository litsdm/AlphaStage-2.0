import React, { Component } from 'react';
import { string } from 'prop-types';
import styles from './FeedbackModal.scss';

import Modal from '../../Modal';
import VideoPlayer from '../../VideoPlayer';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

class FeedbackModal extends Component {
  state = {
    comments: []
  }

  setStateProperty = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { finalVideo, id } = this.props;
    const { comments } = this.state;
    return (
      <Modal title="Testing Feedback" id={id}>
        {
          finalVideo !== null
            ? <VideoPlayer src={finalVideo} />
            : null
        }
        <div className={styles.Content}>
          <p>Comments</p>
          <CommentList comments={comments} setState={this.setStateProperty} />
          <CommentInput comments={comments} setState={this.setStateProperty} />
        </div>
        <div className={styles.Footer}>
          <button className={styles.Submit}>Send Feedback</button>
        </div>
      </Modal>
    );
  }
}

FeedbackModal.propTypes = {
  finalVideo: string,
  id: string
};

FeedbackModal.defaultProps = {
  finalVideo: '',
  id: ''
};

export default FeedbackModal;
