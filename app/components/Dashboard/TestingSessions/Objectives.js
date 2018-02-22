import React from 'react';
import uuid from 'uuid/v4';
import { array, func } from 'prop-types';
import styles from './Objectives.scss';

const Objectives = ({ objectives, handleChange }) => {
  const addObjective = (objective) => {
    const value = [...objectives, objective];
    handleChange({ target: { name: 'objectives', value } });
  };

  const removeObjective = (index) => () => {
    const value = [...objectives.slice(0, index), ...objectives.slice(index + 1)];
    handleChange({ target: { name: 'objectives', value } });
  };

  const renderObjectives = () => (
    objectives.map((objective, index) => (
      <div className={styles.Objective} key={uuid()}>
        <p><i className="fa fa-check-circle-o" /> {objective}</p>
        <button onClick={removeObjective(index)}><i className="fa fa-times" /></button>
      </div>
    ))
  );

  const handleKeyPress = ({ key, target }) => {
    if (key !== 'Enter') return;

    const objective = target.value;
    const objectiveInput = document.getElementById('objectiveInput');
    objectiveInput.value = '';

    addObjective(objective);
  };

  return (
    <div className={styles.Objectives}>
      <input
        id="objectiveInput"
        className={styles.Input}
        onKeyPress={handleKeyPress}
      />
      {renderObjectives()}
    </div>
  );
};

Objectives.propTypes = {
  objectives: array,
  handleChange: func.isRequired,
};

Objectives.defaultProps = {
  objectives: []
};

export default Objectives;
