import React from 'react';
import { bool, func, string } from 'prop-types';

const Button = ({ text, iconClass, btnClass, handleClick, isDisabled }) => (
  <button className={btnClass} onClick={handleClick} disabled={isDisabled}>
    <i className={iconClass} /> {text}
  </button>
);

Button.propTypes = {
  text: string.isRequired,
  iconClass: string.isRequired,
  btnClass: string.isRequired,
  handleClick: func,
  isDisabled: bool
};

Button.defaultProps = {
  handleClick: () => {},
  isDisabled: false
};

export default Button;
