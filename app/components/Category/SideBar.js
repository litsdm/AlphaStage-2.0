import React from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import styles from './SideBar.scss';

const tags = ['Action', 'Adventure', 'Indie', 'Early Stage', 'RPG', 'Simulation', 'Sports'];

const SideBar = ({ currentCategory, setCategory }) => {
  const handleCategoryChange = ({ target }) => {
    const { name } = target;
    setCategory(name);
  };

  const renderTags = () => tags.map(tag => (
    <button
      key={uuid()}
      className={[styles.Tag, tag === currentCategory ? styles.active : ''].join(' ')}
      onClick={handleCategoryChange}
      name={tag}
    >
      {tag}
    </button>
  ));

  return (
    <div className={styles.SideBar}>
      {renderTags()}
    </div>
  );
};

SideBar.propTypes = {
  currentCategory: PropTypes.string,
  setCategory: PropTypes.func.isRequired
};

SideBar.defaultProps = {
  currentCategory: ''
};

export default SideBar;
