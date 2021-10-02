const fs = require('fs');
const { replaceBackground } = require('backrem');
const { nanoid } = require('nanoid');

const db = require('../entities/db');

const get = async (req, res) => {
  const { front, back, color, threshold } = req.query;

  if (!front || !back) {
    return res.status(400).json('Incorrect params');
  }

  const frontRaw = db.findOne(front);
  const backRaw = db.findOne(back);

  if (!frontRaw || !backRaw) {
    return res.status(404).json('Images not found');
  }

  const frontStream = fs.createReadStream(frontRaw.path);

  const backStream = fs.createReadStream(backRaw.path);

  return replaceBackground(
    frontStream,
    backStream,
    color ? color.split(',') : [0, 0, 0],
    threshold,
  )
    .then((readableStream) => {
      res.set({
        'Content-Type': 'image/jpeg',
      });

      readableStream.on('end', () => res.end());
      readableStream.pipe(res);
    })
    .catch(() => res.status(500).json('Something went wrong'));
};

module.exports = {
  get,
};
