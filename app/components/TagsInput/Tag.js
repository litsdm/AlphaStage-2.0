import React from 'react';
import PropTypes from 'prop-types';
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
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemoveClick: PropTypes.func.isRequired
};

export default Tag;
