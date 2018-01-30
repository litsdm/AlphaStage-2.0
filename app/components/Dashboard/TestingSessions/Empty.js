import React from 'react';
import { func } from 'prop-types';
import styles from './Empty.scss';

import NSButton from './NSButton';

const Empty = ({ switchPage }) => {
  const switchToNS = () => switchPage(2);
  return (
    <div className={styles.Empty}>
      <p>You have no testing sessions for this game yet.</p>
      <NSButton switchPage={switchToNS} />
    </div>
  );
};

Empty.propTypes = {
  switchPage: func.isRequired
};

export default Empty;
