import React from 'react';
import styles from './styles.scss';

const Media = () => {
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
          <button id="coverImg" className={styles.ImageButton}>Add cover image</button>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="thumbnail" className={styles.Tag}>Thumbnail</label>
          <p className={styles.InputDescription}>
            This image will be used to display your game throughout Alpha Stage.
            (Aspect ratio: 325x152)
          </p>
          <button id="thumbnail" className={styles.ImageButton}>Add Thumbnail</button>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="screenshots" className={styles.Tag}>Screenshots</label>
          <p className={styles.InputDescription}>
            Adding screenshots is optional but highly recommended
          </p>
          <button id="screenshots" className={styles.ImageButton}>Add Screenshots</button>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="trailer" className={styles.Tag}>Trailer</label>
          <p className={styles.InputDescription}>
            Provide a link to YouTube
          </p>
          <input type="text" id="trailer" name="trailer" className={styles.Input} />
        </div>
      </div>
    </div>
  );
};

export default Media;
