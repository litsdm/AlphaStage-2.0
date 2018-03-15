import React from 'react';
import { func, number, string } from 'prop-types';
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
  src: string,
  name: string.isRequired,
  index: number,
  removeImage: func.isRequired
};

PreviewImage.defaultProps = {
  src: '',
  index: 0
};

export default PreviewImage;
