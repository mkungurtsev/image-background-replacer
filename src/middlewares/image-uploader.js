const multer = require('multer');
const { nanoid } = require('nanoid');

const { IMAGE_FOLDER } = require('../config');

function fileFilter(req, file, cb) {
  if (file.mimetype !== 'image/jpeg') {
    cb(null, false);
    return;
  }

  cb(null, true);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, IMAGE_FOLDER);
  },
  filename(req, file, cb) {
    const id = nanoid();
    // eslint-disable-next-line no-param-reassign
    file.id = id;
    // eslint-disable-next-line no-param-reassign
    file.uploadedAt = Date.now();
    cb(null, `${id}.jpeg`);
  },
});

const uploadImage = (fieldName) =>
  multer({ storage, fileFilter }).single(fieldName);

module.exports = {
  uploadImage,
};
