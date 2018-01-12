import React from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import styles from './SideBar.scss';

const tags = ['Action', 'Adventure', 'Indie', 'Early Stage', 'RPG', 'Simulation', 'Sports'];

const SideBar = ({ currentTag }) => {
  const renderTags = () => tags.map(tag => (
    <button
      key={uuid()}
      className={[styles.Tag, tag === currentTag ? styles.active : ''].join(' ')}
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
  currentTag: PropTypes.string
};

SideBar.defaultProps = {
  currentTag: ''
};

export default SideBar;
