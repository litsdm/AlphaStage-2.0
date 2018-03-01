import ffmpeg from 'fluent-ffmpeg';
import { path as ffmpegPath } from 'ffmpeg-static';
import { path as ffprobePath } from 'ffprobe-static';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export const convertToMp4 = (video, output, cb) => {
  ffmpeg(video)
    .videoCodec('copy')
    .on('end', () => {
      cb(output);
    })
    .saveToFile(output);
};

export const mergeVideoAndAudio = (video, audio, output, cb) => {
  ffmpeg(video)
    .addInput(audio)
    .videoCodec('copy')
    .audioCodec('aac')
    .on('end', () => {
      cb(output);
    })
    .saveToFile(output);
};
