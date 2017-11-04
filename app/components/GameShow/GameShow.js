import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import ContentCard from './ContentCard';

const INITIAL_OFFSET = 427;
const OFFSET_DIFFERENCE = 375;
const PERCENTAGE_DIFFERENCE = 10;
const INITIAL_PERCENTAGE = 90;

class GameShow extends Component {
  componentDidMount() {
    const contentContainer = document.getElementById('content-container');
    const editorRoot = document.getElementsByClassName('DraftEditor-root')[0];

    contentContainer.addEventListener('scroll', this.handleScroll);
    editorRoot.classList += ` ${styles.DraftRoot}`;
  }

  componentWillUnmount() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const element = document.getElementById('contentCard');
    const rect = element.getBoundingClientRect();
    const position = rect.top + document.body.scrollTop;

    const newWidth = position <= 52
      ? 100
      : (
        (
          (
            (INITIAL_OFFSET - position) * PERCENTAGE_DIFFERENCE
          ) / OFFSET_DIFFERENCE
        ) + INITIAL_PERCENTAGE
      );

    element.style.width = `${newWidth}%`;
  }

  render() {
    const { game } = this.props;
    return (
      <div>
        <div className={styles.Header} style={{ backgroundImage: `url(${game.coverImage})` }} />
        <ContentCard game={game} />
      </div>
    );
  }
}

GameShow.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameShow;
