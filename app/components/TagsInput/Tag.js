import React from 'react';
import { func, number, string } from 'prop-types';
import styles from './styles.scss';

const Tag = ({ text, index, onRemoveClick }) => (
  <div className={styles.Tag}>
    <p>{text}</p>
    <button className={styles.RemoveButton} onClick={onRemoveClick(index)}>
      <i className="fa fa-times" />
    </button>
  </div>
);

Tag.propTypes = {
  text: string.isRequired,
  index: number.isRequired,
  onRemoveClick: func.isRequired
};

export default Tag;
