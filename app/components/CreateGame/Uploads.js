import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Uploads = ({ platforms }) => {
  const renderWinButton = () => (
    platforms.win
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="winBuild" className={styles.Tag}>Windows Build</label>
          <input id="winFilePicker" className={styles.FileInput} type="file" />
          <label
            id="winBuild"
            htmlFor="winFilePicker"
            className={styles.LabelButton}
          >
            Add windows build
          </label>
        </div>
      )
      : null
  );

  const renderMacButton = () => (
    platforms.mac
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="macBuild" className={styles.Tag}>Mac Build</label>
          <input id="macFilePicker" className={styles.FileInput} type="file" />
          <label
            id="macBuild"
            htmlFor="macFilePicker"
            className={styles.LabelButton}
          >
            Add mac build
          </label>
        </div>
      )
      : null
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Uploads</p>
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
