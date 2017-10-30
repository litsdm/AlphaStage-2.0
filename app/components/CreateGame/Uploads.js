import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import callApi, { uploadFile } from '../../helpers/apiCaller';

const Uploads = ({ platforms }) => {
  const getSignedRequest = (file) => {
    callApi(`sign-s3?file-name=${file.name}&file-type=${file.type}`)
      .then(res => res.json())
      .then(({ signedRequest }) => uploadFile(file, signedRequest))
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    if (file == null) return;

    getSignedRequest(file);
  };

  const { availableWin, availableMac } = platforms;

  const renderWinButton = () => (
    availableWin
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="winBuild" className={styles.Tag}>Windows Build</label>
          <input id="winFilePicker" className={styles.FileInput} type="file" onChange={handleFileChange} />
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
    availableMac
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="macBuild" className={styles.Tag}>Mac Build</label>
          <input id="macFilePicker" className={styles.FileInput} type="file" onChange={handleFileChange} />
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
