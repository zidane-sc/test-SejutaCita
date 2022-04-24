const pino = require('pino');

module.exports = pino({
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});
