const { Router } = require('express');

const imageApi = require('./image');
const listApi = require('./list');
const mergeApi = require('./merge');
const { uploadImage } = require('../middlewares/image-uploader');

const apiRouter = new Router();

apiRouter.get('/list', listApi.get);

apiRouter.post('/upload', uploadImage('image'), imageApi.post);
apiRouter.get('/image/:id', imageApi.get);
apiRouter.delete('/image/:id', imageApi.delete);

apiRouter.get('/merge', mergeApi.get);

module.exports = apiRouter;
