import React, { Component } from 'react'; //eslint-disable-line
import { EditorState } from 'draft-js';
import shortid from 'shortid';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';
import Details from './Details';
import Uploads from './Uploads';

class CreateGame extends Component {
  state = {
    availableMac: false,
    availableWin: true,
    coverImage: '',
    editorState: EditorState.createEmpty(),
    fileId: shortid.generate(),
    genre: 'Action',
    macBuild: '',
    releaseStatus: '',
    screenshots: [],
    shortDescription: '',
    tags: [],
    title: '',
    thumbnail: '',
    uploadError: '',
    uploadingMacBuild: false,
    uploadingWindowsBuild: false,
    windowsBuild: ''
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleBuildChange = (name, value, uploadingName) => {
    this.setState({
      [name]: value,
      [uploadingName]: false
    });
  }

  renderSubmitButton = () => {
    const { uploadingMacBuild, uploadingWindowsBuild } = this.state;
    return uploadingMacBuild || uploadingWindowsBuild
      ? <button className={styles.FormButtonDisabled} disabled>Create Game</button>
      : <button className={styles.FormButton}>Create Game</button>;
  }

  render() {
    const {
      availableMac,
      availableWin,
      editorState,
      coverImage,
      fileId,
      genre,
      macBuild,
      releaseStatus,
      screenshots,
      shortDescription,
      tags,
      title,
      thumbnail,
      uploadError,
      uploadingMacBuild,
      uploadingWindowsBuild,
      windowsBuild
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
        <Uploads
          platforms={platforms}
          handleChange={this.handleChange}
          handleBuildChange={this.handleBuildChange}
          macBuild={macBuild}
          uploadingMacBuild={uploadingMacBuild}
          uploadingWindowsBuild={uploadingWindowsBuild}
          windowsBuild={windowsBuild}
          fileId={fileId}
          uploadError={uploadError}
        />
        <div className={styles.Divider} />
        <div className={styles.OptionsContainer}>
          <button className={styles.CancelButton}>Cancel</button>
          {this.renderSubmitButton()}
        </div>
      </div>
    );
  }
}

export default CreateGame;
