import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import styles from './styles.scss';

const TopSlider = ({ games }) => {
  const renderGames = () =>
    games.map(game => (
      <div key={uuid()}>
        <img className={styles.SliderImage} alt="Game in slider" src={game.img} />
      </div>
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
    <div className={styles.SliderWrapper}>
      <p className={styles.SliderTitle}>Game Recommendations</p>
      <div className={styles.Divider} />
      <Slider {...settings}>
        { renderGames() }
      </Slider>
    </div>
  );
};

TopSlider.propTypes = {
  games: PropTypes.array.isRequired
};

export default TopSlider;
