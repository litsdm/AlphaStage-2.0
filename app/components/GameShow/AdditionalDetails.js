import React from 'react';
import styles from './AdditionalDetails.scss';

const AdditionalDetails = () => (
  <div className={styles.AdditionalDetails}>
    <p className={styles.Title}>Additional Details</p>
    <div className={styles.Row}>
      <p className={styles.Subtitle}>Languages</p>
      <div className={styles.Values}>
        <p>English</p>
        <p>Spanish</p>
        <p>Japanese</p>
      </div>
    </div>
    <div className={styles.Row}>
      <p className={styles.Subtitle}>Publisher</p>
      <div className={styles.Values}>
        <p>Alpha Stage Studios</p>
      </div>
    </div>
    <div className={styles.Row}>
      <p className={styles.Subtitle}>Space Required</p>
      <div className={styles.Values}>
        <p>20 GB</p>
      </div>
    </div>
    <div className={styles.Row}>
      <p className={styles.Subtitle}>Version</p>
      <div className={styles.Values}>
        <p>0.0.1</p>
      </div>
    </div>
  </div>
);

export default AdditionalDetails;
