import React, { Component } from 'react';
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Button from './Button';

const { app } = remote;

class ButtonContainer extends Component {
  state = {
    isInstalled: false,
  }

  componentWillMount() {
    const { game } = this.props;
    const path = `${app.getPath('appData')}/ASLibrary/${game.title}`;

    if (fs.existsSync(path)) this.setState({ isInstalled: true });
  }

  handleInstallClick = () => {
    const { game } = this.props;

    const url = process.platform === 'darwin' ? game.macBuild : game.windowsBuild;

    const args = {
      id: game._id,
      title: game.title,
      thumbnail: game.thumbnail,
      url
    };

    ipcRenderer.send('download-game', args);
  }

  handlePlayClick = () => {
    console.log('Playing!');
  }

  buttonConfig = () => {
    const { isInstalled } = this.state;

    return isInstalled
      ? {
        iconClass: 'fa fa-gamepad',
        text: 'Play',
        btnClass: styles.ButtonPlay,
        handleClick: this.handlePlayClick
      }
      : {
        iconClass: 'fa fa-download',
        text: 'Install',
        btnClass: styles.ButtonPlay,
        handleClick: this.handleInstallClick
      };
  }

  render() {
    const { text, iconClass, btnClass, handleClick } = this.buttonConfig();
    return (
      <Button
        text={text}
        iconClass={iconClass}
        btnClass={btnClass}
        handleClick={handleClick}
      />
    );
  }
}

ButtonContainer.propTypes = {
  game: PropTypes.object.isRequired
};

export default ButtonContainer;
