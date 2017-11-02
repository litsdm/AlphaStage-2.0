import React, { Component } from 'react';
import styles from './styles.scss';

class ContentCard extends Component {
  render() {
    return (
      <div id="contentCard" className={styles.ContentCard}>
        <p>Card</p>
      </div>
    );
  }
}

export default ContentCard;
