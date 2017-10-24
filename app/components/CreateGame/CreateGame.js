import React, { Component } from 'react';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';

class CreateGame extends Component {
  state = {
    title: '',
    shortDescription: '',
    releaseStatus: ''
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, shortDescription, releaseStatus } = this.state;
    return (
      <div className={styles.CreateGame}>
        <Basic
          title={title}
          shortDescription={shortDescription}
          releaseStatus={releaseStatus}
          handleChange={this.handleChange}
        />
        <div className={styles.Divider} />
        <Media />
        <div className={styles.Divider} />
      </div>
    );
  }
}

export default CreateGame;
