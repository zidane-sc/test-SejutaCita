const error = require('../lib/error');
const logger = require('../lib/logger');

module.exports = function (err, _req, res, _next) {
  if (err instanceof error.ApiError) {
    return res.status(err.httpStatus).json({ message: err.message });
  }

  logger.error(err);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'something wrong.';

  return res.status(statusCode).json({ message });
};
