import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewImage.scss';

const PreviewImage = ({ src }) => (
  src
  ? (
    <div className={styles.ImgContainer}>
      <img className={styles.ImgPreview} src={src} alt="Preview of upload" />
      <div className={styles.Overlay}>
        <button className={styles.ButtonRemove}>
          <i className="fa fa-times" /> Remove
        </button>
      </div>
    </div>
  )
  : null
);

PreviewImage.propTypes = {
  src: PropTypes.string
};

PreviewImage.defaultProps = {
  src: ''
};

export default PreviewImage;
