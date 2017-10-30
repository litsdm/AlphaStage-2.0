import React, { Component } from 'react'; //eslint-disable-line
import { EditorState } from 'draft-js';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';
import Details from './Details';
import Uploads from './Uploads';

class CreateGame extends Component {
  state = {
    title: '',
    shortDescription: '',
    releaseStatus: '',
    availableWin: true,
    availableMac: false,
    coverImage: '',
    thumbnail: '',
    screenshots: [],
    editorState: EditorState.createEmpty(),
    genre: 'Action',
    tags: []
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
      availableWin,
      availableMac,
      coverImage,
      thumbnail,
      screenshots,
      editorState,
      genre,
      tags
    } = this.state;

    const platforms = { availableWin, availableMac };

    return (
      <div className={styles.CreateGame}>
        <Basic
          title={title}
          shortDescription={shortDescription}
          releaseStatus={releaseStatus}
          platforms={platforms}
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
        <Details
          handleChange={this.handleChange}
          editorState={editorState}
          tags={tags}
          genre={genre}
        />
        <div className={styles.Divider} />
        <Uploads platforms={platforms} />
        <div className={styles.Divider} />
        <div className={styles.OptionsContainer}>
          <button className={styles.CancelButton}>Cancel</button>
          <button className={styles.FormButton}>Create Game</button>
        </div>
      </div>
    );
  }
}

export default CreateGame;
