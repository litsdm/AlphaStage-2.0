import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { switchForm } = this.props;
    const { email, password } = this.state;
    console.log(email, password);
    return (
      <div className={styles.Login}>
        <div className={styles.InputGroup}>
          <label htmlFor="loginEmail" className={styles.Tag}>EMAIL</label>
          <input
            id="loginEmail"
            type="email"
            name="email"
            className={styles.Input}
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.InputGroup}>
          <label htmlFor="password" className={styles.Tag}>PASSWORD</label>
          <input
            id="password"
            type="password"
            name="password"
            className={styles.Input}
            value={password}
            onChange={this.handleChange}
          />
        </div>

        <button className={styles.SubmitButton}>Login</button>

        <span className={styles.Switch}>
          New to Alpha Stage? <button onClick={switchForm}>Create an account!</button>
        </span>
      </div>
    );
  }
}

Login.propTypes = {
  switchForm: PropTypes.func.isRequired
};

export default Login;
