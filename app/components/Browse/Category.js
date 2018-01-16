import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Icon from '../IconSystem/Icon';

import pickIconStyle from '../../helpers/pickIconStyle';

const Category = ({ title, icons }) => {
  const renderIcons = () => (
    icons.map(icon => {
      const style = pickIconStyle(title);
      return <Icon key={uuid()} title={icon} styles={style} />;
    })
  );

  return (
    <Link
      to={`/categories/${title}`}
      className={styles.Category}
    >
      {renderIcons()}
      <p>{title}</p>
    </Link>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.array
};

Category.defaultProps = {
  title: '',
  icons: []
};

export default Category;
