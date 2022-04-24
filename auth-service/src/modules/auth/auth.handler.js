const AuthService = require('./auth.service');
const { sendResponse } = require('../../lib/api');

module.exports = {
  async login(req, res, next) {
    AuthService.login(req.body).then(sendResponse(res, 'Hoooray Login Success')).catch(next);
  },
  
  async refresh(req, res, next) {
    AuthService.refresh(req.body.refresh_token).then(sendResponse(res, 'Success refresh the access token!')).catch(next);
  }
};
