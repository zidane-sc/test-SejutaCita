const Joi = require('joi');
const { validateRequest } = require('../../../middlewares');

module.exports = validateRequest(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
);
