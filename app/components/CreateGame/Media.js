import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import parseImageUpload, { coverImageOptions, thumbnailOptions, screenshotOptions } from '../../helpers/parseImageUpload';
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
    validatedInputClass
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

  const renderScreenshots = () => (
    screenshots.map(screenshot => <PreviewImage key={uuid()} src={screenshot} />
    )
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Media</p>
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
            <PreviewImage src={coverImage} />
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
            <PreviewImage src={thumbnail} />
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
  trailer: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  validatedInputClass: PropTypes.func.isRequired,
  coverImage: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  screenshots: PropTypes.array.isRequired
};

export default Media;
