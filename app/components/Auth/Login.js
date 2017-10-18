import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Login = ({ switchForm }) => (
  <div className={styles.Login}>
    <div className={styles.InputGroup}>
      <label htmlFor="loginEmail" className={styles.Tag}>EMAIL</label>
      <input id="loginEmail" type="email" className={styles.Input} />
    </div>
    <div className={styles.InputGroup}>
      <label htmlFor="password" className={styles.Tag}>PASSWORD</label>
      <input id="password" type="password" className={styles.Input} />
    </div>

    <button className={styles.SubmitButton}>Login</button>

    <span className={styles.Switch}>
      New to Alpha Stage? <button onClick={switchForm}>Create an account!</button>
    </span>
  </div>
);

Login.propTypes = {
  switchForm: PropTypes.func.isRequired
};

export default Login;
