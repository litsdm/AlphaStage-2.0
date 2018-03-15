import React from 'react';
import { func, object, string } from 'prop-types';
import styles from './SideBar.scss';

import Controls from '../Controls';
import Profile from './Profile';
import Menu from './Menu';

const SideBar = ({ user, logout, updateUserPic, expFill }) => (
  <div className={styles.SideBar}>
    <Controls />
    <Menu />
    <button
      className={styles.Help}
      onClick={() => { document.getElementById('supportModal').style.display = 'block'; }}
    >
      Help & Feedback
    </button>
    <Profile user={user} logout={logout} updateUserPic={updateUserPic} expFill={expFill} />
  </div>
);

SideBar.propTypes = {
  expFill: string,
  user: object.isRequired,
  logout: func.isRequired,
  updateUserPic: func.isRequired
};

SideBar.defaultProps = {
  expFill: ''
};

export default SideBar;
