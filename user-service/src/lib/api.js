const humps = require('humps');

module.exports = {
  sendResponse(res, message, status = 200) {
    return function (payload) {
        return res.status(status).json({
          message,
          data: humps.decamelizeKeys(payload),
        });
    };
  }
};
