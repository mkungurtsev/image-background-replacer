const path = require('path');

const DB_FOLDER = path.resolve(__dirname, '../../db/');
const DB_DUMP_FILE = path.resolve(DB_FOLDER, 'dump.json');
const IMAGE_FOLDER = path.resolve(DB_FOLDER, 'images');

module.exports = {
  PORT: 8080,
  DB_FOLDER,
  IMAGE_FOLDER,
  DB_DUMP_FILE,
};
