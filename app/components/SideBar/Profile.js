import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.scss';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const Profile = ({ user, logout }) => (
  <div className={styles.Profile}>
    <img
      className={styles.ProfileImg}
      alt="profile"
      src={DEFAULT_IMAGE}
    />
    <div className={styles.ProfileInfo}>
      <p className={styles.Name}>{user.username}</p>
      <div className={styles.ExpBar}>
        <div className={styles.ExpBarFill} />
      </div>
      <p className={styles.Level}>Lv. 100</p>
    </div>
    <button className={styles.OptionsButton} onClick={logout}>
      <i className="fa fa-sign-out" />
    </button>
  </div>
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default Profile;
