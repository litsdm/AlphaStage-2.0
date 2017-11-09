import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, iconClass, btnClass, handleClick }) => (
  <button className={btnClass} onClick={handleClick}>
    <i className={iconClass} /> {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Button;
