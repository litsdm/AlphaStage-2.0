import React, { Component } from 'react';
import { string, object } from 'prop-types';
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

  componentWillMount() {
    const { session } = this.props;
    this.createObjectives(session.objectives);
  }

  createObjectives = (objectives) => {
    const objectivesObject = objectives.map(objective => ({ text: objective, done: false }));
    this.setState({ objectives: objectivesObject });
  }

  setStateProperty = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { finalVideo, id } = this.props;
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
          <button className={styles.Submit}>Send Feedback</button>
        </div>
      </Modal>
    );
  }
}

FeedbackModal.propTypes = {
  finalVideo: string,
  id: string,
  session: object
};

FeedbackModal.defaultProps = {
  finalVideo: '',
  id: '',
  session: {
    objectives: []
  }
};

export default FeedbackModal;
