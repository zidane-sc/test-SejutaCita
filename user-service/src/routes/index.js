const { Router } = require('express');
const route = Router();

route.use('/user', require('../modules/user/user.route'));

module.exports = route;
