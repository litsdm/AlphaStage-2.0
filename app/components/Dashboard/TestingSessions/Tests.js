import React from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import _ from 'lodash';
import { object } from 'prop-types';
import styles from './Tests.scss';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const Tests = ({ session }) => {
  const { testers, maxTesters, rewardType, reward, tests } = session;

  const formatDuration = (duration) => {
    const sec = parseInt(duration % 60, 10);
    const min = parseInt((duration / 60) % 60, 10);
    return `${min}:${sec}`;
  };

  const renderTests = () =>
    tests.map(({ createdAt, duration, testerId, completedObjectives }) => {
      const formattedDuration = formatDuration(duration);

      const date = moment(createdAt);
      const now = moment();

      const user = _.find(testers, { _id: testerId });
      return (
        <div className={styles.Test} key={uuid()}>
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
      <p className={styles.Value}>{value}</p>
    </div>
  );

  return (
    <React.Fragment>
      <div className={styles.Container}>
        {infoRow('Status', 'Active')}
        {infoRow('Testers', `${testers.length} / ${maxTesters}`)}
        {infoRow('Reward Type', rewardType)}
        {
          rewardType !== 'No Reward'
            ? infoRow('Reward', reward)
            : null
        }
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
  session: object.isRequired
};

export default Tests;
