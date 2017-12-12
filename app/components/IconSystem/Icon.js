import React from 'react';
import PropTypes from 'prop-types';

import Boat from './Icons/Boat';
import Chest from './Icons/Chest';
import Development from './Icons/Development';
import DrivingWheel from './Icons/DrivingWheel';
import Flask from './Icons/Flask';
import Gamepad from './Icons/Gamepad';
import Heart from './Icons/Heart';
import Map from './Icons/Map';

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
    development: <Development styles={combinedStyles} fill={fill} />,
    drivingWheel: <DrivingWheel styles={combinedStyles} fill={fill} />,
    flask: <Flask styles={combinedStyles} fill={fill} />,
    gamepad: <Gamepad styles={combinedStyles} fill={fill} />,
    heart: <Heart styles={combinedStyles} fill={fill} />,
    map: <Map styles={combinedStyles} fill={fill} />
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
