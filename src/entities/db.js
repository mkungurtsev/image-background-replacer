const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { stringify } = require('../utils/stringify');
const { writeFile } = require('../utils/fs');
const { DB_DUMP_FILE } = require('../config');
const Image = require('./image');

class Database extends EventEmitter {
  constructor() {
    super();

    this.idToImage = {};
  }

  async initFromDump() {
    if (existsSync(DB_DUMP_FILE) === false) {
      return;
    }

    // eslint-disable-next-line
    const dump = require(DB_DUMP_FILE);

    if (typeof dump.idToImage === 'object') {
      Object.keys(dump.idToImage).forEach((id) => {
        this.idToImage[id] = dump.idToImage[id];
      });
    }
  }

  async insert(image) {
    this.idToImage[image.id] = image;

    this.emit('changed');
  }

  async remove(imageId) {
    const image = this.findOne(imageId);

    if (!image) {
      return undefined;
    }

    await image.removeOriginal();

    delete this.idToImage[imageId];

    this.emit('changed');

    return imageId;
  }

  findOne(imageId) {
    const imageRaw = this.idToImage[imageId];

    if (!imageRaw) {
      return null;
    }

    const image = new Image(imageRaw);

    return image;
  }

  find() {
    const allImages = Object.values(this.idToImage);

    allImages.sort((svgA, svgB) => svgB.createdAt - svgA.createdAt);

    return allImages;
  }

  toJSON() {
    return {
      idToImage: this.idToImage,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(DB_DUMP_FILE, stringify(db.toJSON()));
});

module.exports = db;
