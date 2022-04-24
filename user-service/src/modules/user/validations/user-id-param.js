const mongoose = require('mongoose');
const { ResourceNotFoundError } = require('../../../lib/error');

module.exports = function (req, _res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params['id'])) {
    next(new ResourceNotFoundError('User'));
    return;
  }

  next();
}
