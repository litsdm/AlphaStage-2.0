import React, { Component } from 'react'; //eslint-disable-line
import { EditorState } from 'draft-js';
import shortid from 'shortid';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';
import Details from './Details';
import Uploads from './Uploads';

let _invalidFields = {};
let focusElement = null;

class CreateGame extends Component {
  state = {
    availableMac: false,
    availableWin: true,
    coverImage: '',
    editorState: EditorState.createEmpty(),
    fileId: shortid.generate(),
    genre: 'Action',
    invalidFields: {},
    macBuild: '',
    releaseStatus: 'Released',
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

  submit = () => {
    this.validate();
  }

  validate = () => {
    _invalidFields = {};
    focusElement = null;

    this.checkRequiredFields();
    this.checkBuilds();

    this.setState({ invalidFields: _invalidFields });
    this.focusOnInvalidField();

    return focusElement === null;
  }

  checkRequiredFields = () => {
    const { coverImage, shortDescription, title, thumbnail, editorState } = this.state;

    if (!title) this.markError('title');
    if (!shortDescription) this.markError('shortDescription');
    if (!coverImage) this.markError('coverImage');
    if (!thumbnail) this.markError('thumbnail');
    if (!editorState.getCurrentContent().hasText()) this.markError('editorContainer');
  }

  checkBuilds = () => {
    const { availableMac, availableWin, macBuild, windowsBuild } = this.state;

    if (availableWin && !windowsBuild) this.markError('windowsBuild');
    if (availableMac && !macBuild) this.markError('macBuild');
    if (!availableMac && !availableWin) this.markError('platforms');
  }

  markError = (fieldId) => {
    _invalidFields[fieldId] = true;
    const element = document.getElementById(fieldId);
    if (!focusElement) focusElement = element;
  }

  focusOnInvalidField = () => {
    if (!focusElement) return;

    window.scroll(0, this.findPosition(focusElement));
    focusElement.focus();
  }

  findPosition = (element) => {
    let pos = 0;
    if (element.offsetParent) {
      do {
        pos += element.offsetTop;
      } while (element === element.offsetParent);
      return [pos];
    }
  }

  validatedInputClass = (classList, fieldId) => {
    const { invalidFields } = this.state;
    return invalidFields[fieldId] ? `${classList} ${styles.Invalid}` : classList;
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
      ? (
        <button className={styles.FormButtonDisabled} disabled onClick={this.submit}>
          Create Game
        </button>
      )
      : <button className={styles.FormButton} onClick={this.submit}>Create Game</button>;
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
          validatedInputClass={this.validatedInputClass}
        />
        <div className={styles.Divider} />
        <Media
          coverImage={coverImage}
          thumbnail={thumbnail}
          screenshots={screenshots}
          handleChange={this.handleChange}
          validatedInputClass={this.validatedInputClass}
        />
        <div className={styles.Divider} />
        <Details
          handleChange={this.handleChange}
          editorState={editorState}
          tags={tags}
          genre={genre}
          validatedInputClass={this.validatedInputClass}
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
          validatedInputClass={this.validatedInputClass}
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
