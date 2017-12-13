import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Icon from '../IconSystem/Icon';

const smallStyles = {
  opacity: '0.1',
  width: '35px',
  height: '35px'
};

const iconStyles = [
  {
    top: '50px',
    left: '35px',
  },
  {
    left: '35px',
    bottom: '50px',
  },
  {
    left: '120px',
    top: '35px',
  },
  {
    left: '120px',
    bottom: '35px',
  },
  {
    top: '50px',
    left: '35px',
  },
  {
    left: '20px',
  },
  {
    right: '20px',
  },
  {
    right: '35px',
    top: '50px',
  },
  {
    right: '35px',
    bottom: '50px'
  },
  {
    left: '45px',
    top: '90px',
    ...smallStyles
  },
  {
    left: '45px',
    bottom: '90px',
    ...smallStyles
  },
  {
    rigth: '45px',
    top: '90px',
    ...smallStyles
  },
  {
    rigth: '45px',
    bottom: '90px',
    ...smallStyles
  },
  {
    top: '90px',
    ...smallStyles
  },
  {
    bottom: '90px',
    ...smallStyles
  }
];

const Category = ({ title, icons }) => {
  const renderIcons = () => (
    icons.map(icon => {
      const randomIndex = Math.floor(Math.random() * iconStyles.length);
      const style = iconStyles[randomIndex];
      iconStyles.splice(randomIndex, 1);
      return <Icon key={uuid()} title={icon} styles={style} />;
    })
  );

  return (
    <Link
      to={`/categories/${title.toLowerCase()}`}
      className={styles.Category}
      // style={image ? { backgroundImage: `url('${image}')` } : {}}
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
