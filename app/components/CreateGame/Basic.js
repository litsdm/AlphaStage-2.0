import React from 'react';
import { func, object, string } from 'prop-types';
import uuid from 'uuid/v4';
import styles from './styles.scss';

const releaseOptions = [
  'Released - Game is ready.',
  'Beta - Some aspects of the game need polishing.',
  'Alpha - Some of the main features are yet to be added.',
  'Demo - Only a level or small part of the game.',
  'Prototype - Just testing out an idea.'
];

const Basic = (props) => {
  const {
    title,
    shortDescription,
    releaseStatus,
    platforms,
    handleChange,
    validatedInputClass
  } = props;

  const onPlatformClick = (platform) => (e) => {
    const event = {
      target: {
        name: e.target.name,
        value: !platform
      }
    };

    handleChange(event);
  };

  const renderOptions = () => (
    releaseOptions.map(value => <option value={value} key={uuid()}>{value}</option>)
  );

  const { availableWin, availableMac } = platforms;

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Basic Information</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="title" className={styles.Tag}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={validatedInputClass(styles.Input, 'title')}
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="shortDescription" className={styles.Tag}>Short Description</label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            className={validatedInputClass(styles.Input, 'shortDescription')}
            value={shortDescription}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="releaseStatus" className={styles.Tag}>Release Status</label>
          <select
            id="releaseStatus"
            name="releaseStatus"
            className={styles.Select}
            onChange={handleChange}
            value={releaseStatus}
          >
            {renderOptions()}
          </select>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="platforms" className={styles.Tag}>Platforms</label>
          <div className={validatedInputClass(styles.Platforms, 'platforms')} id="platforms">
            <button
              name="availableWin"
              className={[styles.PlatformButton, availableWin ? styles.active : ''].join(' ')}
              onClick={onPlatformClick(availableWin)}
            >
              <i className="fa fa-windows" />
            </button>
            <button
              name="availableMac"
              className={[styles.PlatformButton, availableMac ? styles.active : ''].join(' ')}
              onClick={onPlatformClick(availableMac)}
            >
              <i className="fa fa-apple" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Basic.propTypes = {
  title: string.isRequired,
  shortDescription: string.isRequired,
  releaseStatus: string.isRequired,
  platforms: object.isRequired,
  handleChange: func.isRequired,
  validatedInputClass: func.isRequired
};

export default Basic;
