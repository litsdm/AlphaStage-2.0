import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Category = ({ title, image }) => (
  <Link to="/" className={styles.Category} style={{ backgroundImage: `url('${image}')` }}>
    <i className="fa fa-gamepad" />
    <p>{title}</p>
  </Link>
);

Category.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired
};

Category.defaultProps = {
  title: ''
};

export default Category;
