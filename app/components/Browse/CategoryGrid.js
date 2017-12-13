import React from 'react';
import uuid from 'uuid/v4';
import styles from './styles.scss';

import Category from './Category';

const categories = [
  {
    title: 'Action',
    icons: ['crosshair', 'rifle', 'sniper']
  },
  {
    title: 'Adventure',
    icons: ['boat', 'chest', 'map']
  },
  {
    title: 'Indie',
    icons: ['gamepad', 'invader', 'joystick']
  },
  {
    title: 'Early Stage',
    icons: ['development', 'idea', 'letter']
  },
  {
    title: 'RPG',
    icons: ['flask', 'heart', 'swordShield']
  },
  {
    title: 'Simulation',
    icons: ['drivingWheel', 'rocket', 'tank']
  },
  {
    title: 'Sports',
    icons: ['soccer', 'strategy', 'whistle']
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
