import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Info = ({ message, isNewUser }) => (
  <div className={[styles.Info, isNewUser ? styles.NewUser : ''].join(' ')}>
    <h2>{message}</h2>
  </div>
);

Info.propTypes = {
  message: PropTypes.string.isRequired,
  isNewUser: PropTypes.bool.isRequired
};

export default Info;
