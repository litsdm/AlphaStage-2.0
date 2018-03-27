import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { array } from 'prop-types';
import uuid from 'uuid/v4';

import styles from './styles.scss';

const TopSlider = ({ games }) => {
  const renderGames = () =>
    games.map(game => (
      <Link to={`/games/${game._id}`} key={uuid()}>
        <img className={styles.SliderImage} alt="Game in slider" src={game.thumbnail} />
      </Link>
    ));

  const settings = {
    arrows: games.length > 3,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: games.length > 3 ? 3 : games.length,
    slidesToScroll: 3
  };

  return (
    <div className={`browse ${styles.Wrapper}`}>
      <p className={styles.Title}>Game Recommendations</p>
      <div className={styles.Divider} />
      <Slider {...settings}>
        { renderGames() }
      </Slider>
    </div>
  );
};

TopSlider.propTypes = {
  games: array.isRequired
};

export default TopSlider;
