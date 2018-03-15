import React from 'react';
import { array, func } from 'prop-types';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Tag from './Tag';

const TagsInput = ({ tags, handleAddTag, handleRemoveTag }) => {
  const handleKeyPress = ({ key, target }) => {
    if (key !== 'Enter') return;

    const tag = target.value;
    const tagInput = document.getElementById('tagInput');
    tagInput.value = '';

    handleAddTag(tag);
  };

  const onRemoveClick = (index) => () => {
    handleRemoveTag(index);
  };

  const renderTags = () => (
    tags.map((tag, index) => (
      <Tag key={uuid()} text={tag} index={index} onRemoveClick={onRemoveClick} />
    ))
  );

  return (
    <div className={styles.TagsInput}>
      {renderTags()}
      <input
        id="tagInput"
        type="text"
        className={styles.Input}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

TagsInput.propTypes = {
  tags: array.isRequired,
  handleAddTag: func.isRequired,
  handleRemoveTag: func.isRequired
};

export default TagsInput;
