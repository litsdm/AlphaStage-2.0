import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.scss';

import Controls from '../Controls';
import Profile from './Profile';
import Menu from './Menu';

const SideBar = ({ user, logout, updateUserPic }) => (
  <div className={styles.SideBar}>
    <Controls />
    <Menu />
    <button className={styles.Help}>
      Help & Feedback
    </button>
    <Profile user={user} logout={logout} updateUserPic={updateUserPic} />
  </div>
);

SideBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  updateUserPic: PropTypes.func.isRequired
};

export default SideBar;
