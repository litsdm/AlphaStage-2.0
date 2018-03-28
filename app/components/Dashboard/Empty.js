import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Empty.scss';

const Empty = () => (
  <div className={styles.Empty}>
    <p>You have no games yet.</p>
    <Link to="/games/new" className={styles.Button}>Create Game</Link>
  </div>
);

export default Empty;
