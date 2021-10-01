const path = require('path');
const { readFileSync } = require('fs');

const { removeFile } = require('../utils/fs');

module.exports = class Image {
  constructor(data = {}) {
    this.id = data.id;
    this.path = data.path;
    this.uploadedAt = data.uploadedAt;
    this.size = data.size;
    this.mimeType = data.mimetype;
  }

  async removeOriginal() {
    await removeFile(this.path);
  }

  toPublicJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
      // eslint-disable-next-line
      body: readFileSync(path.resolve(this.path)),
      mimeType: this.mimeType,
    };
  }
};
