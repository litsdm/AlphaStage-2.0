import React from 'react';
import styles from './styles.scss';

import Category from './Category';

const categories = [
  'Action', 'Adventure', 'Alpha', 'Beta', 'Demos', 'Indie', 'Prototypes', 'RPG',
  'Simulation', 'Sports'
];

const image = 'http://www.dsogaming.com/wp-content/uploads/2017/05/Crysis-3-feature-672x372.jpg';

const CategoryGrid = () => {
  const renderCategories = () => categories.map(category => (
    <Category title={category} image={image} />
  ));

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>Categories</p>
      <div className={styles.Divider} />
      <div className={styles.Grid}>
        {renderCategories()}
      </div>
    </div>
  );
};

export default CategoryGrid;
