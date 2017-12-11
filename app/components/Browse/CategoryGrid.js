import React from 'react';
import styles from './styles.scss';

import Category from './Category';

const categories = [
  {
    title: 'Action',
    img: 'http://www.dsogaming.com/wp-content/uploads/2017/05/Crysis-3-feature-672x372.jpg'
  },
  {
    title: 'Adventure',
    img: 'https://media.playstation.com/is/image/SCEA/the-witcher-3-wild-hunt-blood-and-wine-screen-05-ps4-us-06may16?$MediaCarousel_Original$',
  },
  {
    title: 'Indie',
    img: 'http://www.heart-machine.com/wp-content/uploads/2013/11/HLD_Screenshot_01_camp_1080.png'
  },
  {
    title: 'Early Stage',
    img: 'https://i.ytimg.com/vi/JcsLQFXzpr4/maxresdefault.jpg'
  },
  {
    title: 'RPG',
    img: 'https://image.shutterstock.com/z/stock-photo-calling-of-the-dragon-magician-summoning-monster-sorcerer-casts-a-spell-illustration-425039560.jpg'
  },
  {
    title: 'Simulation',
    img: 'https://media.playstation.com/is/image/SCEA/goat-simulator-screenshot-05-ps4-us-31jul15?$MediaCarousel_Original$'
  },
  {
    title: 'Sports',
    img: 'https://image.shutterstock.com/z/stock-photo-soccer-player-in-action-on-night-stadium-panorama-background-265884884.jpg'
  }
];

const CategoryGrid = () => {
  const renderCategories = () => categories.map(({ title, img }) => (
    <Category title={title} image={img} />
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
