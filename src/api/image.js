const db = require('../entities/db');
const Image = require('../entities/image');

const post = async (req, res) => {
  if (!req.file) {
    return res.status(400).json('File type is incorrect');
  }

  const image = new Image(req.file);

  db.insert(image);

  return res.json(image.toPublicJSON());
};

const get = async (req, res) => {
  const imageRaw = db.findOne(req.params.id);

  if (!imageRaw) {
    return res.status(404).json('Image not found');
  }

  const image = new Image(imageRaw);

  return res.json(image.toPublicJSON());
};

const deleteImage = async (req, res) => {
  const id = await db.remove(req.params.id);

  if (id) {
    return res.json(id);
  }

  return res.status(404).json('Image not found');
};

module.exports = {
  post,
  get,
  delete: deleteImage,
};
