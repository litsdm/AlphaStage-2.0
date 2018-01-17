import { desktopCapturer } from 'electron';
import RecordRTC from 'recordrtc';

let recordRTC;
let startTime;
const defaultOptions = {
  mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
  bitsPerSecond: 128000,
  canvas: {
    width: 1280,
    height: 720
  }
};

class DesktopRecorder {
  constructor(onStop, itemName, options = defaultOptions) {
    this.onStopCallback = onStop;
    this.mediaOptions = options;
    this.name = itemName;
  }

  startRecording = () => {
    let selectedSource = null;
    let entireScreen;

    // get all recordable screens
    startTime = Date.now();
    desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
      const lowerCaseName = this.name.toLowerCase();

      sources.forEach((source) => {
        // Check for specifi screen only on macOS, on windows it does not record
        // an specific screen correctly.
        if (process.platform === 'darwin') {
          // Try to get screen of game based on the game's name
          const lowerCaseSource = source.name.toLowerCase();
          if (lowerCaseSource.includes(lowerCaseName)) {
            selectedSource = source.id;
          }
        }
        if (source.name === 'Entire screen') {
          entireScreen = source.id;
        }
      });

      // If the specific screen was not found we record the entire screen
      if (!selectedSource) {
        selectedSource = entireScreen;
      }

      if (navigator.mediaDevices) {
        // Get recording of user's screen
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: selectedSource,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }).then((stream) => {
          recordRTC = RecordRTC(stream, this.mediaOptions);
          recordRTC.startRecording();

          return Promise.resolve(stream);
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  stopRecording = () => {
    if (recordRTC) {
      recordRTC.stopRecording(() => {
        const blobObject = {
          blob: recordRTC.getBlob(),
          startTime,
          stopTime: Date.now()
        };

        this.onStopCallback(blobObject);
      });
    }
  }
}

export default DesktopRecorder;
