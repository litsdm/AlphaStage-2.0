import React from 'react';
import { array, bool, func, string } from 'prop-types';
import uuid from 'uuid/v4';
import parseImageUpload, { coverImageOptions, thumbnailOptions, screenshotOptions, removeFile } from '../../helpers/parseImageUpload';
import styles from './styles.scss';
import previewStyles from './PreviewImage.scss';

import PreviewImage from './PreviewImage';

const Media = (props) => {
  const {
    trailer,
    coverImage,
    thumbnail,
    screenshots,
    handleChange,
    validatedInputClass,
    edit
  } = props;

  const chooseImage = (type) => () => {
    const options = {
      cover: coverImageOptions,
      thumb: thumbnailOptions,
      screenshots: screenshotOptions
    };

    const names = {
      cover: 'coverImage',
      thumb: 'thumbnail',
      screenshots: 'screenshots'
    };

    parseImageUpload(options[type])
      .then(({ filesUploaded }) => {
        const value = type === 'screenshots'
          ? filesUploaded.map(file => file.url)
          : filesUploaded[0].url;
        const event = {
          target: {
            name: names[type],
            value
          }
        };
        handleChange(event);
        return Promise.resolve(event);
      })
      .catch(err => console.log(err));
  };

  const removeImage = (src, name, index) => {
    const parts = src.split('/');
    const handle = parts[parts.length - 1];

    const value = name === 'screenshots'
      ? [...screenshots.slice(0, index), ...screenshots.slice(index + 1)]
      : '';

    handleChange({ target: { name, value } });

    removeFile(handle);
  };

  const renderScreenshots = () => (
    screenshots.map((screenshot, i) => (
      <PreviewImage
        key={uuid()}
        src={screenshot}
        name="screenshots"
        index={i}
        removeImage={removeImage}
      />
    ))
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Media</p>
        <p className={styles.Description}>
          {edit ? ' Note: If you update any image on edit it will be saved even if you click the cancel button or don\'t click save. This will be fixed in a later version.' : ''}
        </p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="coverImg" className={styles.Tag}>Cover Image</label>
          <p className={styles.InputDescription}>
            {'This image will be used as the header in your game\'s page. (Aspect ratio: 1280x720)'}
          </p>
          <div className={previewStyles.PreviewWrapper}>
            <button
              id="coverImage"
              className={validatedInputClass(styles.FormButton, 'coverImage')}
              onClick={chooseImage('cover')}
            >
              Add cover image
            </button>
            <PreviewImage name="coverImage" src={coverImage} removeImage={removeImage} />
          </div>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="thumbnail" className={styles.Tag}>Thumbnail</label>
          <p className={styles.InputDescription}>
            This image will be used to display your game throughout Alpha Stage.
            (Aspect ratio: 650x300)
          </p>
          <div className={previewStyles.PreviewWrapper}>
            <button
              id="thumbnail"
              className={validatedInputClass(styles.FormButton, 'coverImage')}
              onClick={chooseImage('thumb')}
            >
              Add Thumbnail
            </button>
            <PreviewImage name="thumbnail" src={thumbnail} removeImage={removeImage} />
          </div>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="screenshots" className={styles.Tag}>Screenshots</label>
          <p className={styles.InputDescription}>
            Adding screenshots is optional but highly recommended
          </p>
          <div className={previewStyles.PreviewWrapper}>
            <button
              id="screenshots"
              className={styles.FormButton}
              onClick={chooseImage('screenshots')}
            >
              Add Screenshots
            </button>
            {
              screenshots.length > 0
                ? <div className={previewStyles.ScreensPreview}>{renderScreenshots()}</div>
                : null
            }
          </div>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="trailer" className={styles.Tag}>Trailer</label>
          <p className={styles.InputDescription}>
            Provide a link to YouTube
          </p>
          <input
            type="text"
            id="trailer"
            name="trailer"
            value={trailer}
            className={validatedInputClass(styles.Input, 'trailer')}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

Media.propTypes = {
  trailer: string.isRequired,
  handleChange: func.isRequired,
  validatedInputClass: func.isRequired,
  coverImage: string.isRequired,
  thumbnail: string.isRequired,
  screenshots: array.isRequired,
  edit: bool
};

Media.defaultProps = {
  edit: false
};

export default Media;
