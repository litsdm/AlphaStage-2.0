import React from 'react';
import { remote } from 'electron';
import styles from './Controls.scss';

const Controls = () => {
  const handleMaximize = () => {
    const win = remote.getCurrentWindow();
    if (!win.isMaximized()) {
      win.maximize();
    } else {
      win.unmaximize();
    }
  };

  const handleMinimize = () => {
    const win = remote.getCurrentWindow();
    win.minimize();
  };

  const handleClose = () => {
    const win = remote.getCurrentWindow();
    win.close();
  };

  const controls = process.platform === 'darwin'
    ? (
      <div className={styles.Controls}>
        <button className={styles.CloseControl} onClick={handleClose} />
        <button className={styles.MinimizeControl} onClick={handleMinimize} />
        <button className={styles.MaximizeControl} onClick={handleMaximize} />
      </div>
    )
    : (
      <div className={styles.Bar}>
        <div className={styles.WinControls}>
          <button className={styles.WinMinimize} onClick={handleMinimize}>
            <i className="fa fa-window-minimize" />
          </button>
          <button className={styles.WinMaximize} onClick={handleMaximize}>
            <i className="fa fa-square" />
          </button>
          <button className={styles.WinClose} onClick={handleClose}>
            <i className="fa fa-times" />
          </button>
        </div>
      </div>
    );

  return controls;
};

export default Controls;
