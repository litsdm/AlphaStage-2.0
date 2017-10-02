import React from 'react';
import styles from './Profile.scss';

const Profile = () => (
  <div className={styles.Profile}>
    <img
      className={styles.ProfileImg}
      alt="profile"
      src="http://www.konbini.com/wp-content/blogs.dir/9/files/2017/04/onepunchman-480x279.jpg"
    />
    <div className={styles.ProfileInfo}>
      <p className={styles.Name}>Leetos</p>
      <div className={styles.ExpBar}>
        <div className={styles.ExpBarFill} />
      </div>
      <p className={styles.Level}>Lv. 100</p>
    </div>
    <i className={[styles.GearIcon, 'fa fa-cog'].join(' ')} />
  </div>
);

export default Profile;
