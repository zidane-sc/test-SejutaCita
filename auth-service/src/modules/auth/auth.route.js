const { Router } = require('express');
const handler = require('./auth.handler');
const validation = require('./validations');
const route = Router();

route.post('/login', validation.loginValidation, handler.login);
route.post('/refresh', validation.refreshValidation, handler.refresh);

module.exports = route;
