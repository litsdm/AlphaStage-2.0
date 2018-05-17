import React from 'react';
import { shell } from 'electron';
import { func } from 'prop-types';
import styles from './styles.scss';

const NoAccess = ({ switchPage }) => (
  <div className={styles.NoAccess}>
    <button className={styles.BackButton} onClick={() => switchPage(1)}>
      <i className="fa fa-chevron-left" />
    </button>
    <p>
      Your account has been created but we are
      <strong> currently on closed beta for developers</strong>
      {' '}only. If you want to get access you can do so on
      <a href="#as" onClick={() => shell.openExternal('http://www.alphastage.gg')}>
        {' '}Alpha Stage{'\''}s website
      </a>.
    </p>
  </div>
);

NoAccess.propTypes = {
  switchPage: func.isRequired
};

export default NoAccess;
