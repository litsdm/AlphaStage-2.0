import React from 'react';
import styles from './styles.scss';

import Category from './Category';

const categories = [
  'Action', 'Adventure', 'Alpha', 'Beta', 'Demos', 'Indie', 'Prototypes', 'RPG',
  'Simulation', 'Sports'
];

const CategoryGrid = () => {
  const renderCategories = () => categories.map(category => <Category title={category} />);

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
