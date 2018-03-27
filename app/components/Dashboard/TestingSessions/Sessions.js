import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import { array, string, func } from 'prop-types';
import styles from './Sessions.scss';

import NSButton from './NSButton';

const Sessions = ({ createId, sessions, switchPage }) => {
  const handleSwitch = (index) => () => switchPage(2, index);

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

  const renderSessionRows = () =>
    sessions.map((session, index) => {
      const { startDate, endDate, testers, plan, name } = session;
      const { maxTesters } = JSON.parse(plan);

      const displayStart = moment(startDate).format('MMM Do, YYYY');
      const displayEnd = moment(endDate).format('MMM Do, YYYY');

      return (
        <div
          key={uuid()}
          className={styles.Row}
          onClick={handleSwitch(index)}
          role="button"
          tabIndex={0}
          onKeyPress={() => {}}
        >
          <p className={styles.Dates}>
            {`${displayStart} - ${displayEnd}`}
          </p>
          {renderStatus(session)}
          <p>{name}</p>
          <p className={styles.Testers}>
            {`Testers: ${testers.length} / ${maxTesters}`}
          </p>
        </div>
      );
    });


  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <NSButton createId={createId} />
      </div>
      <div className={styles.Divider} />
      <div className={styles.List}>
        {renderSessionRows()}
      </div>
    </div>
  );
};

Sessions.propTypes = {
  createId: string.isRequired,
  sessions: array.isRequired,
  switchPage: func.isRequired
};

export default Sessions;
