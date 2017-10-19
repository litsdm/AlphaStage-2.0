// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import styles from './SideBar.scss';

import Profile from './Profile';

class SideBar extends Component {
  handleMaximize = () => {
    const win = remote.getCurrentWindow();
    if (!win.isMaximized()) {
      win.maximize();
    } else {
      win.unmaximize();
    }
  }

  handleMinimize = () => {
    const win = remote.getCurrentWindow();
    win.minimize();
  }

  handleClose = () => {
    const win = remote.getCurrentWindow();
    win.close();
  }

  render() {
    const { user, logout } = this.props;
    return (
      <div className={styles.Menu}>
        <div className={styles.Controls}>
          <button className={styles.CloseControl} onClick={this.handleClose} />
          <button className={styles.MinimizeControl} onClick={this.handleMinimize} />
          <button className={styles.MaximizeControl} onClick={this.handleMaximize} />
        </div>
        <Profile user={user} logout={logout} />
      </div>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default SideBar;
