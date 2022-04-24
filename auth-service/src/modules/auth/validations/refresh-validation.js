const Joi = require('joi');
const { validateRequest } = require('../../../middlewares');

module.exports = validateRequest(
  Joi.object({
    refresh_token: Joi.string().required(),
  }),
);
