import filestack from 'filestack-js'; // eslint-disable-line

const apiKey = 'AqgEqdptQ7SGoJ2GtTwKZz';

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
  imageDim: [980, 400],
  imageMin: [980, 400],
  transformations: {
    crop: {
      aspectRatio: 49 / 20,
      force: true,
    },
  },
};

export const thumbnailOptions = {
  imageDim: [325, 150],
  imageMin: [325, 150],
  transformations: {
    crop: {
      aspectRatio: 13 / 6,
      force: true,
    },
  },
};

const baseOptions = {
  uploadInBackground: false // hack for crop to be respected when not moved by users
};


const parseImageUpload = (options) => (
  filestack.init(apiKey).pick({
    accept: 'image/*',
    ...baseOptions,
    ...options,
  })
);

export default parseImageUpload;
