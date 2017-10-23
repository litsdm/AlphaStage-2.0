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

  return (
    <div className={styles.Controls}>
      <button className={styles.CloseControl} onClick={handleClose} />
      <button className={styles.MinimizeControl} onClick={handleMinimize} />
      <button className={styles.MaximizeControl} onClick={handleMaximize} />
    </div>
  );
};

export default Controls;
