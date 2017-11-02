import React from 'react';
import styles from './styles.scss';

const ContentCard = ({ game }) => (
  <div id="contentCard" className={styles.ContentCard}>
    <div className={styles.ContentHeader}>
      <p className={styles.Title}>{game.title}</p>
    </div>
    <div className={styles.Content}>

    </div>
  </div>
);

export default ContentCard;
