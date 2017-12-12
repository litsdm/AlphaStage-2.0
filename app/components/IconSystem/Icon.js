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

const Icon = ({ title, width, height, fill }) => {
  const icons = {
    boat: <Boat width={width} height={height} fill={fill} />,
    chest: <Chest width={width} height={height} fill={fill} />,
    development: <Development width={width} height={height} fill={fill} />,
    drivingWheel: <DrivingWheel width={width} height={height} fill={fill} />,
    flask: <Flask width={width} height={height} fill={fill} />,
    gamepad: <Gamepad width={width} height={height} fill={fill} />,
    heart: <Heart width={width} height={height} fill={fill} />,
    map: <Map width={width} height={height} fill={fill} />
  };

  return icons[title];
};

Icon.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string
};

Icon.defaultProps = {
  title: '',
  width: '50px',
  height: '50px',
  fill: '#fff'
};

export default Icon;
