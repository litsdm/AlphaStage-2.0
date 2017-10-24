import React, { Component } from 'react';
import styles from './styles.scss';

class Basic extends Component {
  render() {
    return (
      <div className={styles.Row}>
        <div className={styles.ColumnLeft}>
          <p className={styles.Title}>Basic Information</p>
        </div>
        <div className={styles.ColumnRight}>
          <div className={styles.InputContainer}>
            <label htmlFor="title" className={styles.Tag}>Title</label>
            <input type="text" id="title" name="title" className={styles.Input} />
          </div>
          <div className={styles.InputContainer}>
            <label htmlFor="shortDescription" className={styles.Tag}>Short Description</label>
            <input type="text" id="shortDescription" name="shortDescription" className={styles.Input} />
          </div>
          <div className={styles.InputContainer}>
            <label htmlFor="releaseStatus" className={styles.Tag}>Release Status</label>
            <input type="text" id="releaseStatus" name="releaseStatus" className={styles.Input} />
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
