const morgan = require('morgan');

const format = JSON.stringify({
  date: ':date[iso]',
  method: ':method',
  url: ':url',
  status: ':status',
  user_agent: ':user-agent',
  response_time: ':response-time',
});

module.exports = morgan(format);
