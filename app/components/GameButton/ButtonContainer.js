import React, { Component } from 'react';
import { remote, ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import fs from 'fs';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import { startDownload } from '../../actions/game';

import Button from './Button';

const { app } = remote;

const mapStateToProps = ({ game }) => (
  {
    ...game,
    downloadId: game.id
  }
);

const mapDispatchToProps = dispatch => ({
  startDownloading: (id) => dispatch(startDownload(id))
});

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
    const { game, startDownloading } = this.props;

    const url = process.platform === 'darwin' ? game.macBuild : game.windowsBuild;

    const args = {
      id: game._id,
      title: game.title,
      thumbnail: game.thumbnail,
      url
    };

    ipcRenderer.send('download-game', args);
    startDownloading(game._id);
  }

  handlePlayClick = () => {
    console.log('Playing!');
  }

  buttonConfig = () => {
    const { game, isDownloading, isInstalling, downloadId } = this.props;
    const { isInstalled } = this.state;

    if (downloadId && downloadId === game._id) {
      if (isDownloading) {
        return {
          iconClass: 'fa fa-spinner fa-spin',
          text: 'Downloading',
          btnClass: styles.ButtonDisabled,
          handleClick: null,
          isDisabled: true
        };
      } else if (isInstalling) {
        return {
          iconClass: 'fa fa-spinner fa-spin',
          text: 'Installing',
          btnClass: styles.ButtonDisabled,
          handleClick: null,
          isDisabled: true
        };
      }
    } else {
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
  }

  render() {
    const { text, iconClass, btnClass, handleClick, isDisabled } = this.buttonConfig();
    return (
      <Button
        text={text}
        iconClass={iconClass}
        btnClass={btnClass}
        handleClick={handleClick}
        isDisabled={isDisabled}
      />
    );
  }
}

ButtonContainer.propTypes = {
  game: PropTypes.object.isRequired,
  startDownloading: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool,
  isInstalling: PropTypes.bool,
  downloadId: PropTypes.string
};

ButtonContainer.defaultProps = {
  isDownloading: false,
  isInstalling: false,
  downloadId: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);
