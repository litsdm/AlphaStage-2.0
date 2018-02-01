import React from 'react';
import { string } from 'prop-types';
import styles from './Empty.scss';

import NSButton from './NSButton';

const Empty = ({ createId }) => (
  <div className={styles.Empty}>
    <p>You have no <strong>Testing Sessions</strong> for this game yet.</p>
    <NSButton createId={createId} />
  </div>
);

Empty.propTypes = {
  createId: string.isRequired
};

export default Empty;
