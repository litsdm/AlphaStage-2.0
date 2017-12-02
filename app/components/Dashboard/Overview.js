import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overview.scss';

const Overview = ({ downloads, pageViews, plays, uninstalls }) => (
  <div className={styles.Overview}>
    <div className={styles.Card}>
      <p className={styles.Title}>Downloads</p>
      <p className={styles.Value}>{downloads}</p>
    </div>
    <div className={styles.Card}>
      <p className={styles.Title}>Page Views</p>
      <p className={styles.Value}>{pageViews}</p>
    </div>
    <div className={styles.Card}>
      <p className={styles.Title}>Times Played</p>
      <p className={styles.Value}>{plays}</p>
    </div>
    <div className={styles.Card}>
      <p className={styles.Title}>Uninstalls</p>
      <p className={styles.Value}>{uninstalls}</p>
    </div>
  </div>
);


Overview.propTypes = {
  downloads: PropTypes.number,
  pageViews: PropTypes.number,
  plays: PropTypes.number,
  uninstalls: PropTypes.number
};

Overview.defaultProps = {
  downloads: 0,
  pageViews: 0,
  plays: 0,
  uninstalls: 0
};

export default Overview;
