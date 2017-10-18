import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Signup = ({ switchForm }) => (
  <div className={styles.Signup}>
    <div className={styles.InputGroup}>
      <label htmlFor="loginEmail" className={styles.Tag}>EMAIL</label>
      <input id="loginEmail" type="email" className={styles.Input} />
    </div>
    <div className={styles.InputGroup}>
      <label htmlFor="username" className={styles.Tag}>USERNAME</label>
      <input id="username" type="text" className={styles.Input} />
    </div>
    <div className={styles.InputGroup}>
      <label htmlFor="password" className={styles.Tag}>PASSWORD</label>
      <input id="password" type="password" className={styles.Input} />
    </div>
    <div className={styles.InputGroup}>
      <label htmlFor="confirmPassword" className={styles.Tag}>CONFIRM PASSWORD</label>
      <input id="confirmPassword" type="password" className={styles.Input} />
    </div>

    <button className={styles.SubmitButton}>Signup</button>

    <span className={styles.Switch}>
      Already have an account? <button onClick={switchForm}>Login now!</button>
    </span>
  </div>
);

Signup.propTypes = {
  switchForm: PropTypes.func.isRequired
};

export default Signup;
