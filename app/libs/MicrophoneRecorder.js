// Credit to Mark Muskardin at:
// https://github.com/hackingbeauty/react-mic/blob/master/src/libs/MicrophoneRecorder.js

import AudioContext from './AudioContext';

let analyser;
let audioCtx;
let mediaRecorder;
let chunks = [];
let startTime;
let stream;
let mediaOptions;
let blobObject;
let onStartCallback;
let onStopCallback;

const constraints = { audio: true, video: false }; // constraints - only audio needed

export default class MicrophoneRecorder {
  constructor(onStart, onStop, options) {
    onStartCallback = onStart;
    onStopCallback = onStop;
    mediaOptions = options;
  }

  startRecording = () => {
    startTime = Date.now();

    if (mediaRecorder) {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        return;
      }

      if (audioCtx && mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start(10);
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        if (onStartCallback) { onStartCallback(); }
      }
    } else {
      navigator.mediaDevices.getUserMedia(constraints).then((str) => {
        stream = str;

        if (MediaRecorder.isTypeSupported(mediaOptions.mimeType)) {
          mediaRecorder = new MediaRecorder(str, mediaOptions);
        } else {
          mediaRecorder = new MediaRecorder(str);
        }

        if (onStartCallback) onStartCallback();

        mediaRecorder.onstop = this.onStop;
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        audioCtx = AudioContext.getAudioContext();
        analyser = AudioContext.getAnalyser();

        mediaRecorder.start(10);

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        return str;
      }).catch(err => console.log(err));
    }
  }

  stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      audioCtx.suspend();
    }
  }

  onStop = () => {
    const blob = new Blob(chunks, { type: mediaOptions.mimeType });
    chunks = [];

    blobObject = {
      blob,
      startTime,
      stopTime: Date.now(),
      options: mediaOptions,
      url: URL.createObjectURL(blob)
    };

    if (onStopCallback) onStopCallback('mic', blobObject);
  }
}
