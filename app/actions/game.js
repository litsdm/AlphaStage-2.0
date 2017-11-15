export const startDownload = (id) => (
  {
    type: 'START_DOWNLOAD',
    id
  }
);

export const startInstall = () => (
  {
    type: 'START_INSTALL'
  }
);

export const finishInstall = () => (
  {
    type: 'FINISH_INSTALL'
  }
);

export const finishDownload = () => (
  {
    type: 'FINISH_DOWNLOAD'
  }
);
