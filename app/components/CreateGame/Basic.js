import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Basic = ({ title, shortDescription, releaseStatus, handleChange }) => (
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
          className={styles.Input}
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
          className={styles.Input}
          value={shortDescription}
          onChange={handleChange}
        />
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="releaseStatus" className={styles.Tag}>Release Status</label>
        <input
          type="text"
          id="releaseStatus"
          name="releaseStatus"
          className={styles.Input}
          value={releaseStatus}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

Basic.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  releaseStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Basic;
