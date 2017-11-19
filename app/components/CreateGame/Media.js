import React from 'react';
import PropTypes from 'prop-types';
import parseImageUpload, { coverImageOptions, thumbnailOptions, screenshotOptions } from '../../helpers/parseImageUpload';
import styles from './styles.scss';

const Media = ({ trailer, handleChange, validatedInputClass }) => {
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
        const value = type === 'screenshots' ? filesUploaded : filesUploaded[0].url;
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

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Media</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="coverImg" className={styles.Tag}>Cover Image</label>
          <p className={styles.InputDescription}>
            {'This image will be used as the header in your game\'s page. (Aspect ratio: 980x400)'}
          </p>
          <button
            id="coverImage"
            className={validatedInputClass(styles.FormButton, 'coverImage')}
            onClick={chooseImage('cover')}
          >
            Add cover image
          </button>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="thumbnail" className={styles.Tag}>Thumbnail</label>
          <p className={styles.InputDescription}>
            This image will be used to display your game throughout Alpha Stage.
            (Aspect ratio: 325x150)
          </p>
          <button
            id="thumbnail"
            className={validatedInputClass(styles.FormButton, 'coverImage')}
            onClick={chooseImage('thumb')}
          >
              Add Thumbnail
            </button>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="screenshots" className={styles.Tag}>Screenshots</label>
          <p className={styles.InputDescription}>
            Adding screenshots is optional but highly recommended
          </p>
          <button
            id="screenshots"
            className={styles.FormButton}
            onClick={chooseImage('screenshots')}
          >
              Add Screenshots
            </button>
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
  validatedInputClass: PropTypes.func.isRequired
};

export default Media;
