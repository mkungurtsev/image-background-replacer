const db = require('../entities/db');
const Image = require('../entities/image');

const get = async (req, res) => {
  const images = db
    .find()
    .map((item) => new Image(item).toPublicJSON());

  return res.json(images);
};

module.exports = {
  get,
};
