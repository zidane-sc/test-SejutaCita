const { expressjwt: jwt } = require("express-jwt");

module.exports = jwt({
  secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  algorithms: ['HS256']
});
