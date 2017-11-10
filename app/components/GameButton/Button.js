import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, iconClass, btnClass, handleClick, isDisabled }) => (
  <button className={btnClass} onClick={handleClick} disabled={isDisabled}>
    <i className={iconClass} /> {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool
};

Button.defaultProps = {
  handleClick: () => {},
  isDisabled: false
};

export default Button;
