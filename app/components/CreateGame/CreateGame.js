import React from 'react';
import styles from './styles.scss';

import Basic from './Basic';

const CreateGame = () => (
  <div className={styles.CreateGame}>
    <Basic />
    <div className={styles.Divider} />
  </div>
);

export default CreateGame;
