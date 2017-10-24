import React from 'react';
import styles from './styles.scss';

const CreateGame = () => (
  <div className={styles.CreateGame}>
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Main</p>
      </div>
      <div className={styles.ColumnRight}>
        <label htmlFor="name" className={styles.Tag}>Name</label>
        <input type="text" id="name" name="name" className={styles.Input} />
      </div>
    </div>
    <div className={styles.Divider} />
  </div>
);

export default CreateGame;
