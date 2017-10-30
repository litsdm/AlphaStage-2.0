import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import callApi, { uploadFile } from '../../helpers/apiCaller';

const Uploads = (props) => {
  const {
    platforms,
    handleChange,
    handleBuildChange,
    macBuild,
    uploadingMacBuild,
    uploadingWindowsBuild,
    windowsBuild,
  } = props;

  const getSignedRequest = (file, name) => {
    const uploadingName = `uploading${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    let buildUrl = '';

    handleChange({ target: { name: uploadingName, value: true } });

    callApi(`sign-s3?file-name=${file.name}&file-type=${file.type}`)
      .then(res => res.json())
      .then(({ signedRequest, url }) => {
        buildUrl = url;
        return uploadFile(file, signedRequest);
      })
      .then(res => {
        if (res.status !== 200) return Promise.reject('Unable to upload. Please try again later.');
        handleBuildChange(name, buildUrl, uploadingName);
        return buildUrl;
      })
      .catch(err => console.log(err));
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    if (file == null) return;

    getSignedRequest(file, target.name);
  };

  const { availableWin, availableMac } = platforms;

  const renderWinButton = () => (
    availableWin
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="winBuild" className={styles.Tag}>Windows Build</label>
          { uploadingWindowsBuild ? <i className="fa fa-spinner fa-spin" /> : null }
          {
            !uploadingWindowsBuild && windowsBuild
              ? <i className="fa fa-check" style={{ color: '#12F812' }} />
              : null
          }
          <input
            id="winFilePicker"
            name="windowsBuild"
            className={styles.FileInput}
            type="file"
            onChange={handleFileChange}
          />
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
          { uploadingMacBuild ? <i className="fa fa-spinner fa-spin" /> : null }
          {
            !uploadingMacBuild && macBuild
              ? <i className="fa fa-check" style={{ color: '#12F812' }} />
              : null
          }
          <input
            id="macFilePicker"
            name="macBuild"
            className={styles.FileInput}
            type="file"
            onChange={handleFileChange}
          />
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
  platforms: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBuildChange: PropTypes.func.isRequired,
  macBuild: PropTypes.string.isRequired,
  uploadingMacBuild: PropTypes.bool.isRequired,
  uploadingWindowsBuild: PropTypes.bool.isRequired,
  windowsBuild: PropTypes.string.isRequired
};

export default Uploads;
