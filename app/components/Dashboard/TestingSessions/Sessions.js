import React from 'react';
import { string } from 'prop-types';
import styles from './Sessions.scss';

import NSButton from './NSButton';

const Sessions = ({ createId }) => (
  <div className={styles.Container}>
    <NSButton createId={createId} />
    <div className={styles.Divider} />
  </div>
);

Sessions.propTypes = {
  createId: string.isRequired
};

export default Sessions;
