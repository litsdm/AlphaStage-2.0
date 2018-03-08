import React, { Component } from 'react';
import { string } from 'prop-types';
import videojs from 'video.js';

export default class VideoJS extends Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { src, id } = this.props;
    return (
      <div data-vjs-player>
        <video id={id} src={src} ref={node => { this.videoNode = node; }} className="video-js" />
      </div>
    );
  }
}

VideoJS.propTypes = {
  src: string,
  id: string
};

VideoJS.defaultProps = {
  src: '',
  id: ''
};
