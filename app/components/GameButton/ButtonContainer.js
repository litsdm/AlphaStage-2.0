import React, { Component } from 'react';
import { remote } from 'electron';
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

  buttonConfig = () => {
    const { isInstalled } = this.state;

    return isInstalled
      ? { iconClass: 'fa fa-gamepad', text: 'Play', btnClass: styles.ButtonPlay }
      : { iconClass: 'fa fa-download', text: 'Install', btnClass: styles.ButtonPlay };
  }

  render() {
    const { text, iconClass, btnClass } = this.buttonConfig();
    return (
      <Button text={text} iconClass={iconClass} btnClass={btnClass} />
    );
  }
}

ButtonContainer.propTypes = {
  game: PropTypes.object.isRequired
};

export default ButtonContainer;
