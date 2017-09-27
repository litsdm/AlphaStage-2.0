import React from 'react';
import PropTypes from 'prop-types';
import styles from './TopBar.scss';

const TopBar = ({ history }) => {
  const handlePrevious = () => {
    history.goBack();
  };

  return (
    <div className={styles.TopBar}>
      <button className={styles.PrevButton} onClick={handlePrevious}>
        <i className="fa fa-angle-left fa-2x" />
      </button>
    </div>
  );
};

TopBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default TopBar;
