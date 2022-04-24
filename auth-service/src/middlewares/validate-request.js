const { ValidationError } = require('../lib/error');

module.exports = function (schema) {
  return function (req, _res, next) {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const details = error.details.map(d => d.message).join(', ');
      next(new ValidationError(details));
      return;
    }

    req.body = value;
    next();
  };
};
