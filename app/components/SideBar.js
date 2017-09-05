// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import styles from './SideBar.scss';

export default class SideBar extends Component {
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
    return (
      <div className={styles.Menu}>
        <div className={styles.Controls}>
          <button className={styles.CloseControl} onClick={this.handleClose} />
          <button className={styles.MinimizeControl} onClick={this.handleMinimize} />
          <button className={styles.MaximizeControl} onClick={this.handleMaximize} />
        </div>
      </div>
    );
  }
}
