const { Router } = require('express');
const route = Router();

route.use('/auth', require('../modules/auth/auth.route'));

module.exports = route;
