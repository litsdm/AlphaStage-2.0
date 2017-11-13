const initialState = { id: '', isDownloading: false, isInstalling: false, isFinished: false };
const games = (state = initialState, { type, id }) => {
  switch (type) {
    case 'START_DOWNLOAD':
      return {
        id,
        isDownloading: true
      };

    case 'START_INSTALL':
      return {
        ...state,
        isDownloading: false,
        isInstalling: true
      };

    case 'FINISH_DOWNLOAD':
      return {
        ...state,
        isInstalling: false,
        isFinished: true,
      };

    default:
      return state;
  }
};

export default games;
