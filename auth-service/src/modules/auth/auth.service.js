const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const User = require('./models/user.model');
const { InvalidLoginError } = require('../../lib/error');

module.exports = {
  async login({ username, password}) {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new InvalidLoginError();
    }

    const { id, role } = user;

    const accessToken = jwt.generate(id, username, role, process.env.JWT_ACCESS_TOKEN_SECRET, '1h');
    const refreshToken = jwt.generate(id, username, role, process.env.JWT_REFRESH_TOKEN_SECRET, '7d');
    
    return {
      id,
      username,
      role,
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken) {
    const { id, username, role } = jwt.verifyUser(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

    const accessToken = jwt.generate(id, username, role, process.env.JWT_ACCESS_TOKEN_SECRET, '1h');

    return {
      accessToken,
    };
  }  
}
