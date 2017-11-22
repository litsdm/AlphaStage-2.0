import filestack from 'filestack-js'; // eslint-disable-line

const apiKey = 'AqgEqdptQ7SGoJ2GtTwKZz';
const security = {
  policy: 'eyJjYWxsIjpbInBpY2siLCJyZWFkIiwic3RhdCIsIndyaXRlIiwid3JpdGVVcmwiLCJzdG9yZSIsImNvbnZlcnQiLCJyZW1vdmUiLCJleGlmIl0sImV4cGlyeSI6MTUxMzgyMTYwMH0=',
  signature: '7e9bbed3afbd3160ff6a71e1134445e7903a6163bcd747fd196904c930f70201'
};

export const profilePictureOptions = {
  imageDim: [400, 400],
  imageMin: [400, 400],
  transformations: {
    crop: {
      aspectRatio: 1,
      force: true,
    },
  },
};

export const coverImageOptions = {
  imageDim: [1280, 720],
  imageMin: [1280, 720],
  transformations: {
    crop: {
      aspectRatio: 16 / 9,
      force: true,
    },
  },
};

export const thumbnailOptions = {
  imageDim: [650, 300],
  imageMin: [650, 300],
  transformations: {
    crop: {
      aspectRatio: 13 / 6,
      force: true,
    },
  },
};

export const screenshotOptions = {
  maxFiles: 6
};

const baseOptions = {
  accept: 'image/*',
  uploadInBackground: false // hack for crop to be respected when not moved by users
};

export const removeFile = (handle) => (
  filestack.init(apiKey, security).remove(handle)
);

const parseImageUpload = (options) => (
  filestack.init(apiKey).pick({
    accept: 'image/*',
    ...baseOptions,
    ...options,
  })
);

export default parseImageUpload;
