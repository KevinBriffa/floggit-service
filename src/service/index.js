const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routesV1 = require('./v1/routes');
const allowCrossOrigin = require('./v1/middleware/allowCrossOrigin');
const logger = require('../utils/helpers/logger');

const isProd = process.env.NODE_ENV === 'production';
const logLevel = isProd ? 'combined' : 'dev';

const app = express();

/* Provide access logging */
app.use(morgan(logLevel, {
  stream: {
    write: message => logger.info(message.trim()),
  },
}));

mongoose.connect('mongodb://127.0.0.1:27017/floggit', {
  useMongoClient: true,
  promiseLibrary: global.Promise,
}, () => {
  logger.info('Connected to database');
});

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet.noCache());
app.use(allowCrossOrigin);

app.use('/v1', routesV1);

app.listen(process.env.PORT, (err) => {
  if (err) {
    logger.error('Service couldn\'t start');
  } else {
    logger.info(`Server running ${process.env.PORT}`);
  }
});
