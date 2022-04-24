const Joi = require('joi');
const { validateRequest } = require('../../../middlewares');

module.exports = validateRequest(
  Joi.object({
    username: Joi.string().min(6).max(25),
    password: Joi.string().min(6),
    role: Joi.string().valid('user', 'admin'),
  }),
);
