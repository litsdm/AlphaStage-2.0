import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Category = ({ title, image }) => (
  <Link
    to={`/categories/${title.toLowerCase()}`}
    className={styles.Category}
    style={image ? { backgroundImage: `url('${image}')` } : {}}
  >
    <div className={styles.Overlay} />
    <i className="fa fa-gamepad" />
    <p>{title}</p>
  </Link>
);

Category.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string
};

Category.defaultProps = {
  title: '',
  image: ''
};

export default Category;
