import fs from 'fs';
import { remote } from 'electron';

const { app } = remote;

const localGameFile = (path) => {
  const regexp = process.platform === 'darwin' ? /^.*\.(app)$/ : /^.*\.(exe)$/;
  let gameFile = '';
  fs.readdirSync(path).forEach(file => {
    if (regexp.test(file)) gameFile = file;
  });

  return gameFile;
};

const gamePath = (game) => {
  const path = `${app.getPath('appData')}/ASLibrary/${game.title}`;
  const file = localGameFile(path);

  return `${path}/${file}`.split(' ').join('\\ ');
};

export default gamePath;
