import React from 'react';
import PropTypes from 'prop-types';

import Boat from './Icons/Boat';
import Chest from './Icons/Chest';
import Crosshair from './Icons/Crosshair';
import Development from './Icons/Development';
import DrivingWheel from './Icons/DrivingWheel';
import Flask from './Icons/Flask';
import Gamepad from './Icons/Gamepad';
import Heart from './Icons/Heart';
import Idea from './Icons/Idea';
import Invader from './Icons/Invader';
import Joystick from './Icons/Joystick';
import Letter from './Icons/Letter';
import Map from './Icons/Map';
import Rifle from './Icons/Rifle';
import Rocket from './Icons/Rocket';
import Sniper from './Icons/Sniper';
import Soccer from './Icons/Soccer';
import Strategy from './Icons/Strategy';
import SwordShield from './Icons/SwordShield';
import Tank from './Icons/Tank';
import Whistle from './Icons/Whistle';

const defaultStyles = {
  opacity: '0.3',
  position: 'absolute',
  width: '50px',
  height: '50px',
};

const Icon = ({ title, styles, fill }) => {
  const combinedStyles = { ...defaultStyles, ...styles };
  const icons = {
    boat: <Boat styles={combinedStyles} fill={fill} />,
    chest: <Chest styles={combinedStyles} fill={fill} />,
    crosshair: <Crosshair styles={combinedStyles} fill={fill} />,
    development: <Development styles={combinedStyles} fill={fill} />,
    drivingWheel: <DrivingWheel styles={combinedStyles} fill={fill} />,
    flask: <Flask styles={combinedStyles} fill={fill} />,
    gamepad: <Gamepad styles={combinedStyles} fill={fill} />,
    heart: <Heart styles={combinedStyles} fill={fill} />,
    idea: <Idea styles={combinedStyles} fill={fill} />,
    invader: <Invader styles={combinedStyles} fill={fill} />,
    joystick: <Joystick styles={combinedStyles} fill={fill} />,
    letter: <Letter styles={combinedStyles} fill={fill} />,
    map: <Map styles={combinedStyles} fill={fill} />,
    rifle: <Rifle styles={combinedStyles} fill={fill} />,
    rocket: <Rocket styles={combinedStyles} fill={fill} />,
    sniper: <Sniper styles={combinedStyles} fill={fill} />,
    soccer: <Soccer styles={combinedStyles} fill={fill} />,
    strategy: <Strategy styles={combinedStyles} fill={fill} />,
    swordShield: <SwordShield styles={combinedStyles} fill={fill} />,
    tank: <Tank styles={combinedStyles} fill={fill} />,
    whistle: <Whistle styles={combinedStyles} fill={fill} />
  };

  return icons[title];
};

Icon.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  fill: PropTypes.string
};

Icon.defaultProps = {
  title: '',
  styles: {},
  fill: '#fff'
};

export default Icon;
