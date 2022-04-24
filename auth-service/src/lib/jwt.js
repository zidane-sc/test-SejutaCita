const jwt = require('jsonwebtoken');

module.exports = {
  generate(id, username, role, secret, exp) {
    return jwt.sign({ id, username, role }, secret, { expiresIn: exp });
  },

  verifyUser(token, secret) {
    return jwt.verify(token, secret);
  }
};
