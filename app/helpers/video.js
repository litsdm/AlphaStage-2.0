import ffmpeg from 'fluent-ffmpeg';
import { path as ffmpegPath } from 'ffmpeg-static';
import { path as ffprobePath } from 'ffprobe-static';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export const mergeVideoAndAudio = (video, audio, output, cb) => { // eslint-disable-line
  ffmpeg(video)
    .addInput(audio)
    .videoCodec('copy')
    .audioCodec('aac')
    .on('end', () => {
      cb(output);
    })
    .saveToFile(output);
};
