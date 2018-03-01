import React from 'react';
import uuid from 'uuid/v4';
import { array, func } from 'prop-types';
import styles from './Objectives.scss';

const ObjectiveList = ({ objectives, setState }) => {
  const renderObjectives = () => (
    objectives.map(({ text, done }, index) => {
      const key = uuid();
      return (
        <label
          htmlFor={`objectiveDone-${key}`}
          className={`${styles.Objective} ${done ? styles.active : ''}`}
          key={key}
        >
          <input
            id={`objectiveDone-${key}`}
            name="micAllowed"
            type="checkbox"
            checked={done}
            onChange={handleObjectiveClick(index)}
          />
          <i className={`fa ${done ? 'fa-check-circle-o' : 'fa-circle-o'}`} /> {text}
        </label>
      );
    })
  );

  const handleObjectiveClick = (index) => ({ target }) => {
    const { checked } = target;
    const { text } = objectives[index];
    const newObjectives = [
      ...objectives.slice(0, index),
      { text, done: checked },
      ...objectives.slice(index + 1)
    ];

    setState('objectives', newObjectives);
  };

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
  objectives: array,
  setState: func.isRequired
};

ObjectiveList.defaultProps = {
  objectives: []
};

export default ObjectiveList;
