import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, iconClass, btnClass }) => (
  <button className={btnClass}>
    <i className={iconClass} /> {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired
};

export default Button;
