const { Router } = require('express');
const handler = require('./user.handler');
const validation = require('./validations');
const middleware = require('../../middlewares');
const route = Router();

route.get('/', middleware.authorize(['admin', 'user']), handler.getUsers);
route.post('/', middleware.authorize(['admin']), validation.createUserValidation, handler.createUser);
route.put('/:id', middleware.authorize(['admin']), validation.userIdParamValidation, validation.updateUserValidation, handler.updateUser);
route.delete('/:id', middleware.authorize(['admin']), validation.userIdParamValidation, handler.deleteUser);

module.exports = route;
