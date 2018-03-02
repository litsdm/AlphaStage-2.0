import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import styles from './FeedbackModal.scss';

import Modal from '../../Modal';
import VideoPlayer from '../../VideoPlayer';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import ObjectiveList from './ObjectiveList';

class FeedbackModal extends Component {
  state = {
    comments: [],
    objectives: []
  }

  componentWillReceiveProps(nextProps) {
    const { session } = this.props;
    if (session !== nextProps.session && nextProps.session) {
      this.createObjectives(nextProps.session.objectives);
    }
  }

  createObjectives = (objectives) => {
    const objectivesObject = objectives.map(objective => ({ text: objective, done: false }));
    this.setState({ objectives: objectivesObject });
  }

  setStateProperty = (name, value) => {
    this.setState({ [name]: value });
  }

  handleSend = () => {
    const { s3Url, session, sendFeedback, id, gameId } = this.props;
    const input = { ...this.state, s3Url, testingSessionId: session._id };

    sendFeedback(input, gameId);
    document.getElementById(id).style.display = 'none';
  }

  render() {
    const { finalVideo, id, s3Url } = this.props;
    const { comments, objectives } = this.state;

    return (
      <Modal title="Testing Feedback" id={id}>
        {
          finalVideo !== null
            ? <VideoPlayer src={finalVideo} />
            : null
        }
        <div className={styles.Content}>
          <p className={styles.Title}>Comments</p>
          <CommentList comments={comments} setState={this.setStateProperty} />
          <CommentInput comments={comments} setState={this.setStateProperty} />
          <p className={styles.Title}>Objectives</p>
          <ObjectiveList setState={this.setStateProperty} objectives={objectives} />
        </div>
        <div className={styles.Footer}>
          <p className={`${styles.Processing} ${!s3Url ? styles.active : ''}`}>
            <i className="fa fa-spinner fa-pulse fa-fw" /> Uploading video please wait.
          </p>
          <button
            className={`${styles.Submit} ${!s3Url ? styles.disabled : ''}`}
            onClick={this.handleSend}
            disabled={!s3Url}
          >
            Send Feedback
          </button>
        </div>
      </Modal>
    );
  }
}

FeedbackModal.propTypes = {
  finalVideo: string,
  id: string,
  gameId: string,
  session: object,
  s3Url: string,
  sendFeedback: func.isRequired
};

FeedbackModal.defaultProps = {
  finalVideo: '',
  id: '',
  gameId: '',
  session: {
    objectives: []
  },
  s3Url: ''
};

export default FeedbackModal;
