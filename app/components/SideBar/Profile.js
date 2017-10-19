import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.scss';

const Profile = ({ user }) => (
  <div className={styles.Profile}>
    <img
      className={styles.ProfileImg}
      alt="profile"
      src="http://www.konbini.com/wp-content/blogs.dir/9/files/2017/04/onepunchman-480x279.jpg"
    />
    <div className={styles.ProfileInfo}>
      <p className={styles.Name}>{user.username}</p>
      <div className={styles.ExpBar}>
        <div className={styles.ExpBarFill} />
      </div>
      <p className={styles.Level}>Lv. 100</p>
    </div>
    <i className={[styles.GearIcon, 'fa fa-cog'].join(' ')} />
  </div>
);

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;
