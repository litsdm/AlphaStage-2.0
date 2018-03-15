import React from 'react';
import { graphql } from 'react-apollo';
import { func, object, string } from 'prop-types';
import styles from './Profile.scss';

import setProfilePicture from '../../graphql/setProfilePicture.graphql';

import parseImageUpload, { profilePictureOptions } from '../../helpers/parseImageUpload';
import { renewToken } from '../../helpers/apiCaller';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const withMutation = graphql(setProfilePicture, {
  props: ({ mutate }) => ({
    setImage: (userId, url) => mutate({ variables: { userId, url } }),
  }),
});

const Profile = ({ user, logout, setImage, updateUserPic, expFill }) => {
  const chooseProfilePicture = () => {
    parseImageUpload(profilePictureOptions)
      .then(({ filesUploaded }) => {
        const { url } = filesUploaded[0];
        setImage(user._id, url)
          .then(() => renewToken(user._id))
          .catch(err => console.log(err));
        updateUserPic(url);

        return filesUploaded;
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.Profile}>
      <button className={styles.ImageContainer} onClick={chooseProfilePicture}>
        <img
          className={styles.ProfileImg}
          alt="profile"
          src={user.profilePic || DEFAULT_IMAGE}
        />
        <div className={styles.ImgOverlay}>
          <i className="fa fa-pencil" />
        </div>
      </button>
      <div className={styles.ProfileInfo}>
        <p className={styles.Name}>{user.username}</p>
        <div className={styles.ExpBar}>
          <div className={styles.ExpBarFill} style={{ width: expFill }} />
        </div>
        <p className={styles.Level}>{`Lv. ${user.level}`}</p>
      </div>
      <button className={styles.OptionsButton} onClick={logout}>
        <i className="fa fa-sign-out" />
      </button>
    </div>
  );
};

Profile.propTypes = {
  expFill: string.isRequired,
  user: object.isRequired,
  logout: func.isRequired,
  setImage: func.isRequired,
  updateUserPic: func.isRequired
};

export default withMutation(Profile);
