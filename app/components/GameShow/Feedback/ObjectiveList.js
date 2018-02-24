import React from 'react';
import uuid from 'uuid/v4';
import { array } from 'prop-types';
import styles from './Objectives.scss';

const ObjectiveList = ({ objectives }) => {
  const renderObjectives = () => (
    objectives.map(objective => (
      <p className={styles.Objective} key={uuid()}>
        <i className="fa fa-circle-o" /> {objective}
      </p>
    ))
  );

  return (
    <div className={styles.List}>
      <p className={styles.Description}>
        Mark all the objectives you completed (this will not affect your reward / exp in any way).
      </p>
      {renderObjectives()}
    </div>
  );
};

ObjectiveList.propTypes = {
  objectives: array
};

ObjectiveList.defaultProps = {
  objectives: []
};

export default ObjectiveList;
