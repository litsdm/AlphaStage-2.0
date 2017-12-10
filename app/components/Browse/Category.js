import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Category = ({ title }) => (
  <Link to="/" className={styles.Category}>
    <i className="fa fa-gamepad" />
    <p>{title}</p>
  </Link>
);

Category.propTypes = {
  title: PropTypes.string
};

Category.defaultProps = {
  title: ''
};

export default Category;
