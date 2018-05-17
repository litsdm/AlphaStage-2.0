import React from 'react';
import { number, string } from 'prop-types';
import styles from './styles.scss';
import logo from '../../../resources/icon.png';

const Info = ({ message, page }) => (
  <div className={[styles.Info, page === 0 ? styles.NewUser : ''].join(' ')}>
    <img src={logo} alt="logo" style={{ width: '100px' }} />
    <h2>{message}</h2>
  </div>
);

Info.propTypes = {
  message: string.isRequired,
  page: number.isRequired
};

export default Info;
