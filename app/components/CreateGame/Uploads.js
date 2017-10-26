import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Uploads = ({ platforms }) => {
  const renderWinButton = () => (
    platforms.win
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="winBuild" className={styles.Tag}>Windows Build</label>
          <button
            id="winBuild"
            className={styles.FormButton}
          >
            Add windows build
          </button>
        </div>
      )
      : null
  );

  const renderMacButton = () => (
    platforms.mac
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="macBuild" className={styles.Tag}>Mac Build</label>
          <button
            id="macBuild"
            className={styles.FormButton}
          >
            Add mac build
          </button>
        </div>
      )
      : null
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Media</p>
      </div>
      <div className={styles.ColumnRight}>
        {renderWinButton()}
        {renderMacButton()}
      </div>
    </div>
  );
};

Uploads.propTypes = {
  platforms: PropTypes.object.isRequired
};

export default Uploads;
