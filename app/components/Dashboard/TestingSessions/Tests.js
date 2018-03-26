import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import _ from 'lodash';
import { object, string, func } from 'prop-types';
import styles from './Tests.scss';

import InviteDropdown from './InviteDropdown';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';


const Tests = ({ session, displayId, selectTest }) => {
  const { testers, tests, plan, name } = session;
  const { name: planName, duration: planDuration, maxTesters } = JSON.parse(plan);

  const getStatus = () => {
    const { startDate, endDate } = session;
    const now = moment();

    if (now.diff(startDate) < 0) {
      return <span className={styles.Pending}>Pending <p>{` - Starts ${now.to(startDate)}`}</p></span>;
    } else if (now.diff(startDate) >= 0 && now.diff(endDate) < 0) {
      return <span className={styles.Active}>Active <p>{` - Ends ${now.to(endDate)}`}</p></span>;
    }
    return <span className={styles.Finished}>Finished <p>{` - ${now.to(endDate)}`}</p></span>;
  };

  const formatDuration = (duration) => {
    const sec = parseInt(duration % 60, 10);
    const min = parseInt((duration / 60) % 60, 10);
    return `${min}:${sec}`;
  };

  const handleTestClick = (test) => () => {
    selectTest(test, () => {
      document.getElementById(displayId).style.display = 'block';
    });
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById('inviteDropdown');

    if (dropdown.style.display === 'none') {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  };

  const renderMark = (mark) => {
    switch (mark) {
      case 0:
        return <React.Fragment><i className="fa fa-thumbs-down" /> Bad Feedback</React.Fragment>;
      case 1:
        return <React.Fragment><i className="fa fa-thumbs-up" /> Good Feedback</React.Fragment>;
      default:
        return 'Unmarked';
    }
  };

  const renderTests = () =>
    tests.map(test => {
      const {
        _id,
        createdAt,
        duration,
        testerId,
        completedObjectives,
        comments,
        objectives,
        mark,
        s3Url
      } = test;
      const formattedDuration = formatDuration(duration);

      const date = moment(createdAt);
      const now = moment();

      const user = _.find(testers, { _id: testerId });
      const input = { testId: _id, videoUrl: s3Url, comments, objectives };
      return (
        <div
          className={styles.Test}
          key={uuid()}
          onClick={handleTestClick(input)}
          role="button"
          tabIndex={0}
          onKeyPress={() => {}}
        >
          <p className={styles.Dates}>Created {now.to(date)}</p>
          <p className={styles.User}>Test by {user.username}</p>
          <div className={styles.SubRow}>
            <p className={styles.TSub}>Duration</p>
            <p className={styles.TVal}>{formattedDuration}</p>
          </div>
          <div className={styles.SubRow}>
            <p className={styles.TSub}>Completed Objectives</p>
            <p className={styles.TVal}>{completedObjectives}</p>
          </div>
          <div className={styles.SubRow}>
            <p className={styles.TSub}>Mark</p>
            <p className={styles.TVal}>{renderMark(mark)}</p>
          </div>
        </div>
      );
    });

  const renderTesters = () =>
    testers.map(tester => (
      <div key={uuid()} className={styles.Tester}>
        <img src={tester.profilePic || DEFAULT_IMAGE} alt="Tester profile pic" />
        <p>{tester.username}</p>
      </div>
    ));

  const infoRow = (subtitle, value) => (
    <div className={styles.Row}>
      <p className={styles.Subtitle}>{subtitle}</p>
      <span className={styles.Value}>{value}</span>
    </div>
  );

  return (
    <React.Fragment>
      <div className={styles.TopContainer}>
        <div className={styles.Info}>
          {infoRow('Name', name)}
          {infoRow('Plan', `${planName} (${planDuration})`)}
          {infoRow('Status', getStatus())}
          {infoRow('Testers', `${testers.length} / ${maxTesters}`)}
        </div>
        <button className={styles.Invite} onClick={toggleDropdown}>Invite Players</button>
        <InviteDropdown />
      </div>
      <div className={styles.Divider} />
      <div className={styles.Container}>
        <div style={{ display: 'flex' }}>
          <div className={styles.Tests}>
            {renderTests()}
          </div>
          <div className={styles.Testers}>
            <div className={styles.THeader}>Testers</div>
            <div className={styles.TList}>
              {renderTesters()}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Tests.propTypes = {
  displayId: string,
  session: object.isRequired,
  selectTest: func.isRequired
};

Tests.defaultProps = {
  displayId: ''
};

export default Tests;
