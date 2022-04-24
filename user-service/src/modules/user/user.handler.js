const UserService = require('./user.service');
const { sendResponse } = require('../../lib/api');

module.exports = {
  async getUsers(_req, res, next) {
    UserService.getAllUser().then(sendResponse(res, 'yess success get all users data')).catch(next);
  },

  async createUser(req, res, next) {
    UserService.createUser(req.body).then(sendResponse(res, 'Yuhuu create user success!', 201)).catch(next);
  },

  async updateUser(req, res, next) {
    UserService.updateUser(req.auth.id, req.body).then(sendResponse(res, 'Update user success!')).catch(next);
  },

  async deleteUser(req, res, next) {
    UserService.deleteUser(req.auth.id).then(sendResponse(res, 'hmmm success delete the user')).catch(next);
  }
};
