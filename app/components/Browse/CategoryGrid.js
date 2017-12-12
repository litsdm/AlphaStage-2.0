import React from 'react';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Category from './Category';

const categories = [
  {
    title: 'Action',
    icons: []
  },
  {
    title: 'Adventure',
    icons: ['boat', 'chest', 'map']
  },
  {
    title: 'Indie',
    icons: ['gamepad']
  },
  {
    title: 'Early Stage',
    icons: ['development']
  },
  {
    title: 'RPG',
    icons: ['flask', 'heart']
  },
  {
    title: 'Simulation',
    icons: ['drivingWheel']
  },
  {
    title: 'Sports',
    icons: []
  }
];

const CategoryGrid = () => {
  const renderCategories = () => categories.map(({ title, icons }) => (
    <Category key={uuid()} title={title} icons={icons} />
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
