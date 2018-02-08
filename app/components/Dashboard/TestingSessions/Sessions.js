import React from 'react';
import moment from 'moment';
import { array, string } from 'prop-types';
import styles from './Sessions.scss';

import NSButton from './NSButton';

const Sessions = ({ createId, sessions }) => {
  const renderStatus = (session) => {
    const { startDate, endDate } = session;
    const now = moment();

    if (now.diff(startDate) < 0) {
      return <span className={styles.Pending}>Pending <p>{` - Starts ${now.to(startDate)}`}</p></span>;
    } else if (now.diff(startDate) >= 0 && now.diff(endDate) < 0) {
      return <span className={styles.Active}>Active <p>{` - Ends ${now.to(endDate)}`}</p></span>;
    }
    return <span className={styles.Finished}>Finished <p>{` - ${now.to(endDate)}`}</p></span>;
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <NSButton createId={createId} />
      </div>
      <div className={styles.Divider} />
      <div className={styles.List}>
        <div className={styles.Row}>
          {renderStatus(sessions[0])}
        </div>
      </div>
    </div>
  );
};

Sessions.propTypes = {
  createId: string.isRequired,
  sessions: array.isRequired
};

export default Sessions;
