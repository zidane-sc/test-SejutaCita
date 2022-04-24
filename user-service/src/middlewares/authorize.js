const { ForbiddenError } = require('../lib/error');
const jwt = require('./jwt');

function authorize(roles = []) {
  return [
    // authenticate jwt token
    jwt,

    // authorize user role
    function (req, _res, next) {
      if (!req.auth || !roles.includes(req.auth.role)) {
        next(new ForbiddenError())
        return;
      }

      next();
    },
  ];
}

module.exports = authorize;
