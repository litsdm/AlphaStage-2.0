import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewImage.scss';

const PreviewImage = ({ src, name, index, removeImage }) => {
  const remove = () => removeImage(src, name, index);

  return src
    ? (
      <div className={styles.ImgContainer}>
        <img className={styles.ImgPreview} src={src} alt="Preview of upload" />
        <div className={styles.Overlay}>
          <button className={styles.ButtonRemove} onClick={remove}>
            <i className="fa fa-times" />
          </button>
        </div>
      </div>
    )
    : null;
};

PreviewImage.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  removeImage: PropTypes.func.isRequired
};

PreviewImage.defaultProps = {
  src: '',
  index: 0
};

export default PreviewImage;
