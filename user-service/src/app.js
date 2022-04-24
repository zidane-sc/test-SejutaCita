require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes');
const logger = require('./lib/logger');
const { connectDB, disconnectDB, seedDB } = require('./lib/mongodb');
const { errorHandler, requestLog } = require('./middlewares');

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.JWT_ACCESS_TOKEN_SECRET || !process.env.MONGODB_URL) {
  logger.fatal('ENV variable is not correct.');
  process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLog);
app.use(router);
app.use(errorHandler);

async function start() {
  await connectDB();
  await seedDB();
  const server = app.listen(port, () => logger.info(`App is running on port ${port}`));

  // process.on('SIGTERM', () => {
  //   logger.info('SIGTERM signal received.');
  //   setTimeout(() => {
  //     server.close(() => {
  //       logger.info('HTTP server closed')

  //       disconnectDB();
  //     })
  //   }, 60000);
  // });

  // process.on('SIGINT', () => {
  //   logger.info('SIGINT signal received.');
  //   setTimeout(() => {
  //     server.close(() => {
  //       logger.info('HTTP server closed')

  //       disconnectDB();
  //     })
  //   }, 60000);
  // });
}

start();