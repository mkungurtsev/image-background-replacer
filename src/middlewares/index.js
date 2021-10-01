const { json } = require('express');

module.exports = (app) => {
  app.use(json());
};
