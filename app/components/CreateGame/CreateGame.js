import React, { Component } from 'react'; //eslint-disable-line
import { EditorState, convertToRaw } from 'draft-js';
import { withRouter } from 'react-router-dom';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import styles from './styles.scss';

import Basic from './Basic';
import Media from './Media';
import Details from './Details';
import Uploads from './Uploads';
import AdditionalDetails from './AdditionalDetails';

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
    languages: [],
    macBuild: '',
    publisher: '',
    releaseStatus: 'Released',
    screenshots: [],
    shortDescription: '',
    spaceRequired: '',
    tags: [],
    title: '',
    thumbnail: '',
    trailer: '',
    uploadError: '',
    uploadingMacBuild: false,
    uploadingWindowsBuild: false,
    website: '',
    windowsBuild: ''
  }

  componentDidMount() {
    const editorRoot = document.getElementsByClassName('DraftEditor-root')[0];
    const editorContent = document.getElementsByClassName('public-DraftEditor-content')[0];
    editorRoot.classList += ` ${styles.DraftRoot}`;
    editorContent.classList += ` ${styles.DraftContent}`;
  }

  submit = () => {
    const { submitGame, user, history } = this.props;
    const {
      coverImage,
      editorState,
      fieldId,
      genre,
      languages,
      macBuild,
      publisher,
      releaseStatus,
      screenshots,
      shortDescription,
      spaceRequired,
      tags,
      title,
      thumbnail,
      trailer,
      website,
      windowsBuild
    } = this.state;

    const currentContent = editorState.getCurrentContent();
    const formattedTrailer = trailer ? this.formatTrailerUrl(trailer) : '';

    const game = {
      buildsId: fieldId,
      coverImage,
      descriptionState: JSON.stringify(convertToRaw(currentContent)),
      developerIds: [user._id],
      genre,
      languages,
      macBuild,
      publisher,
      releaseStatus,
      screenshots,
      shortDescription,
      spaceRequired,
      tags,
      title,
      thumbnail,
      trailer: formattedTrailer,
      website,
      windowsBuild
    };

    if (!this.validate()) return;

    submitGame(game)
      .then(({ data }) => (
        swal({
          title: 'Success!',
          text: 'Your game was succesfully created.',
          icon: 'success',
          buttons: {
            goHome: {
              text: 'Go home',
              value: '/'
            },
            viewPage: {
              text: 'Go to game page',
              value: `/games/${data.createGame._id}`
            }
          }
        })
         .then(route => history.push(route))
         .catch(err => console.log(err))
      ))
      .catch(err => console.log(err));
  }

  validate = () => {
    _invalidFields = {};
    focusElement = null;

    this.checkRequiredFields();
    this.checkBuilds();
    this.checkTrailerUrl();

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

  checkTrailerUrl = () => {
    const { trailer } = this.state;

    if (!trailer || trailer.includes('youtube') || trailer.includes('youtu.be')) return;
    this.markError('trailer');
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

  formatTrailerUrl = (trailer) => {
    if (trailer.includes('embed')) return trailer;

    const parts = trailer.includes('v=') ? trailer.split('v=') : trailer.split('/');
    return `https://www.youtube.com/embed/${parts.pop()}`;
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
      languages,
      macBuild,
      publisher,
      releaseStatus,
      screenshots,
      shortDescription,
      spaceRequired,
      tags,
      title,
      thumbnail,
      trailer,
      uploadError,
      uploadingMacBuild,
      uploadingWindowsBuild,
      website,
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
          trailer={trailer}
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
        <AdditionalDetails
          languages={languages}
          publisher={publisher}
          spaceRequired={spaceRequired}
          website={website}
          handleChange={this.handleChange}
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

CreateGame.propTypes = {
  submitGame: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(CreateGame);
