const express = require('express');
const { PORT } = require('./config');
const setupMiddlewares = require('./middlewares');
const apiRoutes = require('./api');

const app = express();

setupMiddlewares(app);

app.use('/', apiRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port http://localhost:${PORT}`);
});
