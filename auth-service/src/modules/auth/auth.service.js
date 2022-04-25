const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const User = require('./models/user.model');
const { InvalidLoginError } = require('../../lib/error');

const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

module.exports = {
  async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new InvalidLoginError();
    }

    const { id, role } = user;

    const accessToken = jwt.generate(id, username, role, jwtAccessTokenSecret, accessTokenExpiresIn);
    const refreshToken = jwt.generate(id, username, role, jwtRefreshTokenSecret, refreshTokenExpiresIn);

    return {
      id,
      username,
      role,
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken) {
    const { id, username, role } = jwt.verifyUser(refreshToken, jwtRefreshTokenSecret);

    const accessToken = jwt.generate(id, username, role, jwtAccessTokenSecret, accessTokenExpiresIn);

    return {
      accessToken,
    };
  }
}
