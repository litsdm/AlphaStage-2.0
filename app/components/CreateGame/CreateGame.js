import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';
import Details from './Details';

class CreateGame extends Component {
  state = {
    title: '',
    shortDescription: '',
    releaseStatus: '',
    coverImage: '',
    thumbnail: '',
    screenshots: [],
    editorState: EditorState.createEmpty()
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      title,
      shortDescription,
      releaseStatus,
      coverImage,
      thumbnail,
      screenshots,
      editorState
    } = this.state;

    return (
      <div className={styles.CreateGame}>
        <Basic
          title={title}
          shortDescription={shortDescription}
          releaseStatus={releaseStatus}
          handleChange={this.handleChange}
        />
        <div className={styles.Divider} />
        <Media
          coverImage={coverImage}
          thumbnail={thumbnail}
          screenshots={screenshots}
          handleChange={this.handleChange}
        />
        <div className={styles.Divider} />
        <Details handleChange={this.handleChange} editorState={editorState} />
        <div className={styles.Divider} />
      </div>
    );
  }
}

export default CreateGame;
