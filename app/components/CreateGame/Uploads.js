import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import callApi, { uploadFile } from '../../helpers/apiCaller';

const Uploads = (props) => {
  const {
    platforms,
    fileId,
    handleChange,
    handleBuildChange,
    macBuild,
    uploadError,
    uploadingMacBuild,
    uploadingWindowsBuild,
    validatedInputClass,
    windowsBuild,
  } = props;

  const getSignedRequest = (file, name) => {
    const uploadingName = `uploading${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const fileName = `${name}-${fileId}.${file.type.split('/')[1]}`;
    let buildUrl = '';

    handleChange({ target: { name: uploadingName, value: true } });

    callApi(`sign-s3?file-name=${fileName}&file-type=${file.type}`)
      .then(res => res.json())
      .then(({ signedRequest, url }) => {
        buildUrl = url;
        return uploadFile(file, signedRequest);
      })
      .then(res => {
        if (res.status !== 200) return Promise.reject();
        handleBuildChange(name, buildUrl, uploadingName);
        return buildUrl;
      })
      .catch(() => {
        handleBuildChange('uploadError', 'An error ocurred, please try again later.', uploadingName);
      });
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    if (file == null) return;
    if (uploadError) handleBuildChange()

    getSignedRequest(file, target.name);
  };

  const { availableWin, availableMac } = platforms;

  const renderPlatformButton = (name, available, uploading, build) => (
    available
      ? (
        <div className={styles.InputContainer}>
          <label htmlFor="macBuild" className={styles.Tag}>
            { name === 'macBuild' ? 'Mac Build' : 'Windows Build' }
          </label>
          { uploading ? <i className="fa fa-spinner fa-spin" /> : null }
          {
            !uploading && build
              ? <i className="fa fa-check" style={{ color: '#12F812' }} />
              : null
          }
          {
            uploadError
              ? (
                <span className={styles.UploadError}>
                  <i className="fa fa-times" />
                  <span>{uploadError}</span>
                </span>
              )
              : null
          }
          <input
            id={name}
            name={name}
            className={styles.FileInput}
            type="file"
            onChange={handleFileChange}
          />
          <label
            htmlFor={name}
            className={validatedInputClass(styles.LabelButton, name)}
          >
            Add {name === 'macBuild' ? 'mac' : 'windows'} build
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
        {renderPlatformButton('windowsBuild', availableWin, uploadingWindowsBuild, windowsBuild)}
        {renderPlatformButton('macBuild', availableMac, uploadingMacBuild, macBuild)}
      </div>
    </div>
  );
};

Uploads.propTypes = {
  platforms: PropTypes.object.isRequired,
  fileId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBuildChange: PropTypes.func.isRequired,
  macBuild: PropTypes.string.isRequired,
  uploadError: PropTypes.string.isRequired,
  uploadingMacBuild: PropTypes.bool.isRequired,
  uploadingWindowsBuild: PropTypes.bool.isRequired,
  validatedInputClass: PropTypes.func.isRequired,
  windowsBuild: PropTypes.string.isRequired
};

export default Uploads;
