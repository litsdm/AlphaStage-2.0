import React from 'react';
import { bool, func, object, string } from 'prop-types';
import styles from './styles.scss';

import callApi, { uploadFile } from '../../helpers/apiCaller';

const Uploads = (props) => {
  const {
    platforms,
    fileId,
    edit,
    handleChange,
    handleBuildChange,
    macBuild,
    uploadError,
    uploadingMacBuild,
    uploadingWindowsBuild,
    validatedInputClass,
    windowsBuild,
  } = props;

  const getSignedRequest = (file, name, targetName) => {
    const fileName = `${targetName}-${fileId}.${file.type.split('/')[1]}`;
    let buildUrl = '';

    if (uploadError) handleChange({ target: { name: 'uploadError', value: '' } });
    handleChange({ target: { name, value: true } });
    callApi(`sign-s3?file-name=${fileName}&file-type=${file.type}&folder-name=GameBuilds`)
      .then(res => res.json())
      .then(({ signedRequest, url }) => {
        buildUrl = url;
        return uploadFile(file, signedRequest);
      })
      .then(res => {
        if (res.status !== 200) return Promise.reject();
        handleBuildChange(targetName, buildUrl, name);
        return buildUrl;
      })
      .catch(() => {
        handleBuildChange('uploadError', 'An error ocurred, please try again later.', name);
      });
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    const { name } = target;
    const uploadingName = `uploading${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    if (file === null) return;
    if (file.name.split('.').pop() !== 'zip') {
      handleBuildChange('uploadError', 'Please select a .zip file', uploadingName);
      return;
    }

    getSignedRequest(file, uploadingName, name);
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
            accept=".zip"
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
        <p className={styles.Description}>
          Please select a .zip file for your build.
          <br />
          To update your build just click on <q>Add Build</q> again and select the new one.
          {edit ? ' Note: If you update your build on edit it will be saved even if you click the cancel button or don\'t click save. This will be fixed in a later version.' : ''}
        </p>
      </div>
      <div className={styles.ColumnRight}>
        {renderPlatformButton('windowsBuild', availableWin, uploadingWindowsBuild, windowsBuild)}
        {renderPlatformButton('macBuild', availableMac, uploadingMacBuild, macBuild)}
      </div>
    </div>
  );
};

Uploads.propTypes = {
  platforms: object.isRequired,
  fileId: string.isRequired,
  handleChange: func.isRequired,
  handleBuildChange: func.isRequired,
  macBuild: string.isRequired,
  uploadError: string.isRequired,
  uploadingMacBuild: bool.isRequired,
  uploadingWindowsBuild: bool.isRequired,
  validatedInputClass: func.isRequired,
  windowsBuild: string.isRequired,
  edit: bool
};

Uploads.defaultProps = {
  edit: false
};

export default Uploads;
